import json
import os
import requests
import hmac
import hashlib
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from openai import OpenAI
from dotenv import load_dotenv
from mangum import Mangum

# Import local database modules
from database import SessionLocal, Project, init_db

load_dotenv()
init_db()  # Ensure tables are created on startup

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- THE UNIVERSAL PATH CLEANER ---
@app.middleware("http")
async def fix_gateway_pathing(request: Request, call_next):
    """
    This middleware detects if the path has 'default' or 'portfolio-backend-api' 
    and strips them so the internal routes below match correctly.
    """
    path = request.scope["path"]
    
    # Remove the Stage and Resource Name from the internal path 
    # so FastAPI only sees the /api/... part
    path = path.replace("/default", "")
    path = path.replace("/portfolio-backend-api", "")
    
    # Ensure it starts with a /
    if not path.startswith("/"):
        path = "/" + path
    
    # Standardize: remove double slashes
    request.scope["path"] = path.replace("//", "/")
    
    print(f"DEBUG: Internal Routing Path used: {request.scope['path']}")
    return await call_next(request)

# --- DEPENDENCIES & HELPERS ---

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def extract_status_from_topics(topics):
    if "status-done" in topics: return "Done"
    if "status-debugging" in topics: return "Under Debugging"
    if "status-development" in topics: return "In Development"
    return "Planning"

def generate_ai_description(repo_name: str) -> str:
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": f"Briefly describe the GitHub project: {repo_name}"}]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"AI generation failed for {repo_name}: {e}")
        return "AI description unavailable"

def upsert_project_data(db: Session, repo_data: dict):
    existing_project = db.query(Project).filter(Project.repo_name == repo_data['name']).first()
    ai_description = None
    status = extract_status_from_topics(repo_data.get('topics', []))
    
    if not existing_project or not existing_project.ai_description:
        ai_description = generate_ai_description(repo_data['name'])
    
    stmt = insert(Project).values(
        repo_name=repo_data['name'],
        stars=repo_data['stargazers_count'],
        languages=repo_data.get('languages', []),
        homepage_url=repo_data.get('homepage'),
        project_source_url=repo_data.get('html_url'),
        project_status=status,
        last_commit_hash=repo_data.get('commit_hash'),
        ai_description=ai_description
    )
    
    update_dict = {
        "stars": stmt.excluded.stars,
        "languages": stmt.excluded.languages,
        "homepage_url": stmt.excluded.homepage_url,
        "project_source_url": stmt.excluded.project_source_url,
        "project_status": stmt.excluded.project_status,
        "last_commit_hash": stmt.excluded.last_commit_hash
    }
    if ai_description: update_dict["ai_description"] = stmt.excluded.ai_description
    
    db.execute(stmt.on_conflict_do_update(index_elements=['repo_name'], set_=update_dict))
    db.commit()

# --- ENDPOINTS ---

@app.get("/")
def health_check():
    """Matches the root URL: .../default/portfolio-backend-api/"""
    return {"status": "healthy", "message": "Global Root Reached"}

@app.get("/api/projects")
def get_projects_from_db(db: Session = Depends(get_db)):
    """Matches: .../default/portfolio-backend-api/api/projects"""
    return db.query(Project).all()

@app.post("/api/sync-github")
def sync_with_github(db: Session = Depends(get_db)):
    username = "sajad42"
    url = f"https://api.github.com/users/{username}/repos"
    headers = {"User-Agent": "FastAPI-Portfolio-App"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="GitHub API Error")

    repos = response.json()
    for repo in repos:
        lang_url = repo.get('languages_url')
        langs_response = requests.get(lang_url, headers=headers)
        repo['languages'] = list(langs_response.json().keys()) if langs_response.status_code == 200 else []
        upsert_project_data(db, repo)
    
    return {"message": f"Synced {len(repos)} projects to Database."}

@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """Debug route to help see what AWS is sending if it still fails."""
    return {"message": "You hit the catch-all route!", "path_received": full_path}

# Lambda handler
handler = Mangum(app, lifespan="off")
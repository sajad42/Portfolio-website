import os
import requests
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import insert
from openai import OpenAI
from dotenv import load_dotenv

from database import SessionLocal, Project, init_db

load_dotenv()
init_db()  # Ensure tables are created on startup

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Helper function to generate AI description
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

# --- THE UPSERT LOGIC ---
def upsert_project_data(db: Session, repo_data: dict):
    print(f"Upserting project: {repo_data['name']}")
    
    # Check if project exists and needs AI description
    existing_project = db.query(Project).filter(Project.repo_name == repo_data['name']).first()
    ai_description = None
    
    if not existing_project or not existing_project.ai_description:
        ai_description = generate_ai_description(repo_data['name'])
        print(f"Generated AI description for {repo_data['name']}")
    
    stmt = insert(Project).values(
        repo_name=repo_data['name'],
        stars=repo_data['stargazers_count'],
        languages=repo_data.get('languages', []),
        last_commit_hash=repo_data.get('commit_hash'),
        ai_description=ai_description
    )
    
    # Update on conflict, but preserve existing AI description if new one is None
    update_dict = {
        "stars": stmt.excluded.stars,
        "languages": stmt.excluded.languages,
        "last_commit_hash": stmt.excluded.last_commit_hash
    }
    
    if ai_description:
        update_dict["ai_description"] = stmt.excluded.ai_description
    
    upsert_stmt = stmt.on_conflict_do_update(
        index_elements=['repo_name'],
        set_=update_dict
    )
    
    db.execute(upsert_stmt)
    db.commit()
    print("Upsert executed successfully.")

# --- ENDPOINTS ---

@app.get("/api/projects")
def get_projects_from_db(db: Session = Depends(get_db)):
    """Fetches projects from PostgreSQL instead of calling GitHub every time."""
    return db.query(Project).all()

@app.post("/api/sync-github")
def sync_with_github(db: Session = Depends(get_db)):
    """Manually trigger a sync. Later, your Webhook will call this logic."""
    username = "sajad42"
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    repos = response.json()
    print(f"Syncing {len(repos)} projects from GitHub...")

    

    
    for repo in repos:
        # Fetch languages for each repo
        lang_url = f"https://api.github.com/repos/{username}/{repo['name']}/languages"
        print(f"Fetching languages for {repo['name']}")
        print(f"URL: {lang_url}")
        langs_response = requests.get(lang_url)
        repo['languages'] = list(langs_response.json().keys()) if langs_response.status_code == 200 else []

        upsert_project_data(db, repo)
    
    return {"message": f"Synced {len(repos)} projects to Database."}

@app.post("/api/github-webhook")
async def github_webhook(payload: dict, db: Session = Depends(get_db)):
    """
    Placeholder for the Webhook logic.
    GitHub will send data here automatically when you push code.
    """
    print("Received Webhook from GitHub:", payload)
    # Logic to extract commit_hash and trigger upsert goes here
    return {"status": "success"}

@app.get("/api/generate-description")
async def generate_description(repo_name: str, db: Session = Depends(get_db)):
    # Check if we already have it in the DB
    project = db.query(Project).filter(Project.repo_name == repo_name).first()
    if project and project.ai_description:
        return {"description": project.ai_description, "source": "database"}

    # Generate new description
    ai_text = generate_ai_description(repo_name)
    
    # Save to DB
    if project:
        project.ai_description = ai_text
    else:
        project = Project(repo_name=repo_name, ai_description=ai_text)
        db.add(project)
    
    db.commit()
    print(f"Saved AI description for {repo_name}")
        
    return {"description": ai_text, "source": "openai"}
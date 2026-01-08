import json
import os
import requests
import hmac
import hashlib
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
    allow_origins=[
        "http://localhost:5173",
        "https://main.d3a6cq397zfehj.amplifyapp.com"
    ], 
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

# Helper function to extract status from topics
def extract_status_from_topics(topics):
    """
    Deep Concept: Tag-based Logic
    We scan GitHub topics for specific keywords to define our status.
    """
    if "status-done" in topics:
        return "Done"
    if "status-debugging" in topics:
        return "Under Debugging"
    if "status-development" in topics:
        return "In Development"
    return "Planning"  # Default status

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

    # Determine the status from topics list provided by GitHub API
    status = extract_status_from_topics(repo_data.get('topics', []))
    
    if not existing_project or not existing_project.ai_description:
        ai_description = generate_ai_description(repo_data['name'])
        print(f"Generated AI description for {repo_data['name']}")
    
    stmt = insert(Project).values(
        repo_name=repo_data['name'],
        stars=repo_data['stargazers_count'],
        languages=repo_data.get('languages', []),
        homepage_url=repo_data.get('homepage'), # Pulls the live link
        project_source_url=repo_data.get('html_url'), # GitHub repo URL
        project_status=status,
        last_commit_hash=repo_data.get('commit_hash'),
        ai_description=ai_description
    )
    
    # Update on conflict, but preserve existing AI description if new one is None
    update_dict = {
        "stars": stmt.excluded.stars,
        "languages": stmt.excluded.languages,
        "homepage_url": stmt.excluded.homepage_url,
        "project_source_url": stmt.excluded.project_source_url,
        "project_status": stmt.excluded.project_status,
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
    username = "sajad42"
    url = f"https://api.github.com/users/{username}/repos"
    
    # Professional Tip: Always include a User-Agent for GitHub API
    headers = {"User-Agent": "FastAPI-Portfolio-App"}
    response = requests.get(url, headers=headers)
    
    # Check if the request actually worked
    if response.status_code != 200:
        error_detail = response.json().get("message", "Unknown GitHub Error")
        print(f"❌ GitHub API Error: {error_detail}")
        raise HTTPException(status_code=response.status_code, detail=error_detail)

    repos = response.json()
    
    # Ensure we got a list of repositories
    if not isinstance(repos, list):
        print(f"❌ Unexpected response format from GitHub: {repos}")
        raise HTTPException(status_code=500, detail="Invalid data format from GitHub")

    print(f"✅ Syncing {len(repos)} projects from GitHub...")
    
    for repo in repos:
        # Fetch languages for each repo
        lang_url = repo.get('languages_url') # Better than building it manually
        langs_response = requests.get(lang_url, headers=headers)
        repo['languages'] = list(langs_response.json().keys()) if langs_response.status_code == 200 else []

        upsert_project_data(db, repo)
    
    return {"message": f"Synced {len(repos)} projects to Database."}

from fastapi import Request

def validate_hmac(signature: str, payload: bytes, secret: str) -> bool:
    if not signature or not secret:
        return False
    
    expected = hmac.new(
        secret.encode('utf-8'),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    received = signature.replace('sha256=', '') if signature.startswith('sha256=') else signature
    return hmac.compare_digest(expected, received)

# Delete project helper
def delete_repo(db: Session, repo_name: str):
    project = db.query(Project).filter(Project.repo_name == repo_name).first()
    if project:
        db.delete(project)
        db.commit()
        print(f"Deleted project: {repo_name}")
    else:
        print(f"Project {repo_name} not found for deletion.")

@app.post("/api/github-webhook")
async def github_webhook(request: Request, db: Session = Depends(get_db)):

    print("Received GitHub webhook eventssssss.")

    # 1. Capture RAW bytes for HMAC validation
    body = await request.body()
    signature = request.headers.get("X-Hub-Signature-256")
    secret = os.getenv("GITHUB_WEBHOOK_SECRET")

    if not validate_hmac(signature, body, secret):
        print("❌ Webhook validation failed: Invalid Signature")
        raise HTTPException(status_code=403, detail="Invalid signature")
    
    # 2. Safely parse the JSON now that it's verified
    try:
        payload = json.loads(body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    # 3. Extract common info
    repo_data = payload.get("repository", {})
    repo_name = repo_data.get("name")
    action = payload.get("action")
    print(f"Action received: {action} for repo: {repo_name}")


    # --- BRANCH 1: PUSH EVENT ---
    if "pusher" in payload:
        print(f"Push detected for {repo_name}. Syncing data...")
        sync_data = {
            "name": repo_name,
            "stargazers_count": repo_data.get("stargazers_count"),
            "language": repo_data.get("language"),
            "homepage": repo_data.get("homepage"),
            "topics": repo_data.get("topics", []),
            "commit_hash": payload.get("after") 
        }
        upsert_project_data(db, sync_data)
        return {"status": "Database updated via Webhook"}
    
    # --- BRANCH 2: DELETED OR PRIVATIZED ---
    elif action in ["deleted", "privatized"]:
        print(f"Action '{action}' detected for {repo_name}. Removing from DB...")
        delete_repo(db, repo_name)
        return {"status": f"Repository {action} handled via Webhook"}
    
    # --- BRANCH 3: PUBLICIZED ---
    elif action == "publicized":
        print(f"Repository {repo_name} made public. Restoring to portfolio...")
        sync_data = {
            "name": repo_name,
            "stargazers_count": repo_data.get("stargazers_count"),
            "language": repo_data.get("language"),
            "homepage": repo_data.get("homepage"),
            "topics": repo_data.get("topics", []),
            "commit_hash": repo_data.get("default_branch") # No 'after' hash in this event
        }
        upsert_project_data(db, sync_data)
        return {"status": "Repository restored via Webhook"}

    return {"status": "Ignored event"}

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


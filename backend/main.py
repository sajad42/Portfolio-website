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
    """Manually trigger a sync. Later, your Webhook will call this logic."""
    username = "sajad42"
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    repos = response.json()
    print(f"Syncing {len(repos)} projects from GitHub...")

    

    
    for repo in repos:
        # Debug: Print repo data to see available fields
        print(f"Repo data keys: {list(repo.keys())}")
        print(f"HTML URL: {repo.get('html_url')}")
        
        # Fetch languages for each repo
        lang_url = f"https://api.github.com/repos/{username}/{repo['name']}/languages"
        print(f"Fetching languages for {repo['name']}")
        print(f"URL: {lang_url}")
        langs_response = requests.get(lang_url)
        repo['languages'] = list(langs_response.json().keys()) if langs_response.status_code == 200 else []

        upsert_project_data(db, repo)
    
    return {"message": f"Synced {len(repos)} projects to Database."}

from fastapi import Request

@app.post("/api/github-webhook")
async def github_webhook(request: Request, db: Session = Depends(get_db)):
    # 1. Capture the payload from GitHub
    payload = await request.json()
    
    # 2. Extract key info (Deep Concept: Parsing nested JSON)
    repo_data = payload.get("repository", {})
    repo_name = repo_data.get("name")
    
    # Check if this is a 'push' event
    if "pusher" in payload:
        print(f"Push detected for {repo_name}. Syncing data...")
        
        # 3. Use your existing logic to update the DB
        # We fetch fresh data from the repo object in the payload
        sync_data = {
            "name": repo_name,
            "stargazers_count": repo_data.get("stargazers_count"),
            "language": repo_data.get("language"),
            "homepage": repo_data.get("homepage"),
            "topics": repo_data.get("topics", []),
            "commit_hash": payload.get("after") # The 'after' field is the new commit SHA
        }
        
        upsert_project_data(db, sync_data)
        
        # 4. Deep Concept: Event-Driven AI
        # We only trigger AI if the description is missing or force-updated
        # You could even check if the commit message contains "#ai-update"
        return {"status": "Database updated via Webhook"}

    return {"status": "Ignored non-push event"}

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


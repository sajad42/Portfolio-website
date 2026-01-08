from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ARRAY
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column
from typing import List
import datetime
import os

# 1. Handle the Connection String
# Render and Neon provide a 'DATABASE_URL' environment variable.
DATABASE_URL = os.environ.get('DATABASE_URL')

# Fix for SQLAlchemy: it requires 'postgresql://' but some providers give 'postgres://'
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Fallback for local development
if not DATABASE_URL:
    DB_NAME = os.environ.get('RDS_DB_NAME', 'portfolio-db')
    DB_USERNAME = os.environ.get('RDS_USERNAME', 'postgres')
    DB_PASSWORD = os.environ.get('RDS_PASSWORD', 'password')
    DB_HOST = os.environ.get('RDS_HOST', 'localhost')
    DB_PORT = os.environ.get('RDS_PORT', '5431')
    DATABASE_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

print(f"Connecting to database...")

# 2. Create the Engine
# pool_pre_ping=True is essential for Cloud DBs (prevents 'connection closed' errors)
engine = create_engine(
    DATABASE_URL, 
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    repo_name: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    stars: Mapped[int] = mapped_column(Integer, default=0)
    languages: Mapped[List[str]] = mapped_column(ARRAY(String), nullable=True, default=[])
    last_commit_hash: Mapped[str] = mapped_column(String(255), nullable=True)
    ai_description: Mapped[str] = mapped_column(Text, nullable=True)
    homepage_url: Mapped[str] = mapped_column(String(500), nullable=True)
    project_source_url: Mapped[str] = mapped_column(String(500), nullable=True)
    project_status: Mapped[str] = mapped_column(String(50), nullable=True)
    last_updated: Mapped[datetime.datetime] = mapped_column(
        DateTime, 
        default=datetime.datetime.utcnow, 
        onupdate=datetime.datetime.utcnow
    )

def test_connection():
    try:
        with engine.connect() as connection:
            print("✅ Database connection successful!")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

# 3. Helper to create tables
def init_db():
    if test_connection():
        # NEVER use drop_all() in production or you lose your AI descriptions!
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables verified/created.")
    else:
        print("❌ Cannot initialize tables - no connection.")
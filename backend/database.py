from sqlalchemy import URL, create_engine, Column, Integer, String, Text, DateTime, ARRAY
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column
from typing import List
import datetime
import os

# Replace with your local Postgres credentials
DATABASE_URL = "postgresql://postgres:password@localhost:5431/portfolio-db"


# Database configuration - fallback to local if env vars not set
DB_NAME = os.environ.get('RDS_DB_NAME', 'portfolio-db')
DB_USERNAME = os.environ.get('RDS_USERNAME', 'postgres')
DB_PASSWORD = os.environ.get('RDS_PASSWORD', 'password')
DB_HOST = os.environ.get('RDS_HOST', 'localhost')
DB_PORT = os.environ.get('RDS_PORT', '5431')

print(f"Connecting to: {DB_USERNAME}@{DB_HOST}:{DB_PORT}/{DB_NAME}")



url_object = URL.create(
    drivername="postgresql",
    username=DB_USERNAME,
    password=DB_PASSWORD,
    host=DB_HOST,
    database=DB_NAME,
    port=DB_PORT
)

engine = create_engine(url_object)

# Test database connection
def test_connection():
    try:
        with engine.connect() as connection:
            print("✅ Database connection successful!")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False


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
    last_updated: Mapped[datetime.datetime] = mapped_column(
        DateTime, 
        default=datetime.datetime.utcnow, 
        onupdate=datetime.datetime.utcnow
    )

# Helper to create tables if they don't exist
def init_db():
    if test_connection():
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully!")
    else:
        print("❌ Cannot create tables - database connection failed")

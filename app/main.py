from fastapi import FastAPI, Depends, Request, HTTPException, UploadFile, File, Form
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles  # Import StaticFiles
from sqlalchemy.orm import Session
from routers import auth
from database import get_db, engine
import models, schemas
from sqlalchemy.exc import IntegrityError
import shutil
import os
from schemas import RecentItem
from typing import List
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import oauth2
from routers import paper

# Ensure static directory exists
os.makedirs("static", exist_ok=True)

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  # React frontend URL
    "http://localhost:8000",  # Add any other URLs you want to allow
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

templates = Jinja2Templates(directory='app/templates')
app.include_router(auth.router)
app.include_router(paper.router)
# Mount the static files directory
static_dir = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get('/')
def root(request: Request):
    return templates.TemplateResponse('index.html', {"request": request})

@app.post('/submit')
async def submit_paper(
    title: str = Form(...),
    category: str = Form(...),
    authors: str = Form(...),
    description: str = Form(...),
    document: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_name = Depends(oauth2.get_current_user)
):
    # Save the uploaded file
    document_filename = document.filename
    document_path = f"static/{document_filename}"
    
    with open(document_path, "wb") as buffer:
        shutil.copyfileobj(document.file, buffer)
    
    # Create a new research paper record
    try:
        new_paper = models.ResearchPaper(
            title=title,
            category=category,
            authors=authors,
            description=description,
            document_url=f"static/{document_filename}"  # Update URL to reflect static path
        )
        db.add(new_paper)
        db.commit()
        return {"message": "Research paper submitted successfully!"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error in submitting paper")


@app.get("/recent", response_model=List[schemas.RecentItem])
def read_recent_papers(db: Session = Depends(get_db)):
    papers = db.query(models.ResearchPaper).all()
    return [schemas.RecentItem(
        id=paper.id,
        title=paper.title,
        category=paper.category,
        authors=paper.authors,
        description=paper.description,
        document_url=paper.document_url,
        created_at=paper.created_at.isoformat()  # Convert to ISO 8601 string
    ) for paper in papers]

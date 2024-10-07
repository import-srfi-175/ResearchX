from fastapi import FastAPI, Depends, Request, HTTPException, UploadFile, File, Form, APIRouter
from fastapi.responses import JSONResponse
import schemas, models, app.oauth2 as oauth2
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from typing import List
import shutil
from database import get_db


router = APIRouter()

@router.post('/submit')
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
    
    
@router.get("/recent", response_model=List[schemas.RecentItem])
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
from fastapi import  Depends, HTTPException, UploadFile, File, Form, APIRouter,Query
from fastapi.responses import JSONResponse
import schemas, models, oauth2
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from typing import List,Optional
from scraping import scraping_util
from database import get_db

router = APIRouter()

@router.post('/fetch_internet')
async def net_fetch(query: Optional[str] = Query(None), num_results: Optional[int] = Query(None)):
    response = scraping_util.fetch_arxiv_papers(query)
    return response

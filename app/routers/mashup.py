from fastapi import FastAPI, Depends, Request, HTTPException, UploadFile, File, Form, APIRouter
from fastapi.responses import JSONResponse
import schemas, models, oauth2
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import os
from web_mashup import mashed

router = APIRouter()

@router.post('/generate', response_class=JSONResponse)
def generation(pdf_chat: schemas.PDF_chat , ):
    current_folder_path = os.path.dirname(os.path.abspath(__file__))
    parent_folder_path = os.path.dirname(current_folder_path)
    uploads_folder_path = os.path.join(parent_folder_path , 'static')
    pdf_file_path = os.path.join(uploads_folder_path, pdf_chat.pdf_file)
    response = mashed.respond(query=pdf_chat.query , pdf_file=pdf_file_path)
    print(response.text)
    return {'reponse': response.text}
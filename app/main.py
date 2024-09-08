from fastapi import FastAPI, Depends, Request # type: ignore
from fastapi.templating import Jinja2Templates # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from routers import auth
from database import get_db, engine
import models, schemas
models.Base.metadata.create_all(bind = engine)
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

@app.get('/')
def root(request: Request):
    return templates.TemplateResponse('index.html', {"request":request})


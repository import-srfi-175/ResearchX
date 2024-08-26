from fastapi import FastAPI, Depends, Request
from fastapi.templating import Jinja2Templates


app = FastAPI()


templates = Jinja2Templates(directory='app/templates')

@app.get('/')
def root(request: Request):
    return templates.TemplateResponse('index.html', {"request":request})


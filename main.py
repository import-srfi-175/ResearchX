from fastapi import FastAPI, Depends, Request
from fastapi.templating import Jinja2Templates


app = FastAPI()


templates = Jinja2Templates('')

@app.get('/')
def root(request: Request):
    return {"Message": "hello Wrold"}

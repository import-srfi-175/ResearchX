from fastapi import FastAPI, Depends
from fastapi.templating import Jinja2Templates


app = FastAPI()


templates = Jinja2Templates('')

@app.get('')

# hello, this is a test comment.
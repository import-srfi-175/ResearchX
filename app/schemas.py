from pydantic import BaseModel


class Login(BaseModel):
    email:str
    password:str

class NewUser(BaseModel):
    name: str
    username: str
    email:str
    password:str
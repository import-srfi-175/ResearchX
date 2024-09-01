from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session 
from fastapi.responses import JSONResponse
import schemas, models
from database import get_db
import utils

router = APIRouter()

# Simulate a database for demonstration purposes
@router.post('/createuser', response_class=JSONResponse)
async def create_user(user: schemas.NewUser, db: Session  = Depends(get_db)):
        
    new_user = models.User(**user.model_dump())
    new_user.password = utils.hash(new_user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}

@router.post('/login', response_class=JSONResponse)
async def login(creds: schemas.Login, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(models.User).filter(models.User.email == creds.email).first()

    if user:
        # Check if password matches
        if utils.verify(creds.password, user.password):
            return {"message": "Login successful"}
        else:
            raise HTTPException(status_code=401, detail="Invalid password")
    else:
        raise HTTPException(status_code=404, detail="User not found")

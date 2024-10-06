from jose import JWTError, jwt
from datetime import  timedelta
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
import schemas
import datetime
ouath2_scheme = OAuth2PasswordBearer(tokenUrl ='login')

SECRET_KEY = "b18e633da5c2450f964ede54bbdf92e6277565953b88dfb87ec13c8940f28a08"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    
    expire = datetime.datetime.now(datetime.timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode , SECRET_KEY , algorithm =ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token,SECRET_KEY, algorithms=ALGORITHM )
        user_name:str = payload.get("user_name")
        print(user_name)
        if user_name is None:
            raise   credentials_exception
        token_data  = schemas.TokenData(user_name=user_name)
    except JWTError:
        raise credentials_exception
    # print('Verified')
    return token_data
    

def get_current_user(token: str = Depends(ouath2_scheme)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Could not Validate Credentials", headers={"WWW-Authenticate":"Bearer"})
    return verify_access_token(token, credentials_exception=credentials_exception)


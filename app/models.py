from sqlalchemy import String , INTEGER, Column, Date, Time, VARCHAR
from database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP



class User(Base):
    __tablename__ = 'users'
    username = Column(String, primary_key = True)
    email = Column(VARCHAR(length=255))
    password = Column(VARCHAR(length = 255))
    name = Column(VARCHAR(length=255))
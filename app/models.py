from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'

    username = Column(String, primary_key=True)
    email = Column(String(length=255), unique=True, index=True)
    password = Column(String(length=255))
    name = Column(String(length=255))

class ResearchPaper(Base):
    __tablename__ = 'research_papers'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    category = Column(String)
    authors = Column(String)
    description = Column(Text)
    document_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

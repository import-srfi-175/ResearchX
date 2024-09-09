from sqlalchemy import String , INTEGER, Column, Date, Time, VARCHAR, Text, LargeBinary, ForeignKey
from database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = 'users'
    username = Column(String, primary_key = True)
    email = Column(VARCHAR(length=255))
    password = Column(VARCHAR(length = 255))
    name = Column(VARCHAR(length=255))
    
    
class Papers(Base):
    __tablename__ = 'papers'
    paper_id = Column(INTEGER, primary_key = True, autoincrement = True)
    title = Column(String(255), nullable=False)
    category = Column(String(50) , nullable = False)
    description = Column(Text)
    upload_date = Column(TIMESTAMP, server_default='CURRENT_TIMESTAMP')
    file_data = Column(LargeBinary)
    authors = relationship("Author", secondary="paper_authors")
    

class Author(Base):
    __tablename__ = 'authors'
    
    author_id = Column(INTEGER, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255))

class PaperAuthor(Base):
    __tablename__ = 'paper_authors'
    
    paper_id = Column(INTEGER, ForeignKey('papers.id'), primary_key=True)
    author_id = Column(INTEGER, ForeignKey('authors.id'), primary_key=True)

## Depending on requirment could be added Later
# class Category(Base):
#     __tablename__ = 'categories'
    
#     id = Column(INTEGER, primary_key=True, autoincrement=True)
#     name = Column(String(100), unique=True, nullable=False)
    

    

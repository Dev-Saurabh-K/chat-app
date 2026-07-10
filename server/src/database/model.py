from sqlalchemy import Column, Integer, String
from .setup import Base, sessionLocal


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password =  Column(String)



def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


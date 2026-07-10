from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from src.database import model
from src.database.setup import engine
from src.database.model import get_db, User


model.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/test")
def test():
    return(
        {
            "new_user":"you"
        }
    )
@app.get("/test/db")
def test_db(db: Session = Depends(get_db)):
    new_user = User(username="Saurabh", password="00")
    db.add(new_user)
    db.commit()
    return(
        {
            new_user
        }
    )

@app.get("/test/auth/token")
def test_auth_token(db: Session = Depends(get_db), token:  str = Depends(oauth2_scheme)):
    return {"token": token}
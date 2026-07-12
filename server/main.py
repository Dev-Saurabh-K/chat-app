from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from src.database import model
from src.database.setup import engine
from src.database.model import get_db, User

from src.routes import auth_route, websocket_route, message_route

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_route.router)
app.include_router(websocket_route.router)
app.include_router(message_route.router)

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

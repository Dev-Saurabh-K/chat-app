from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from src.database import model
from src.database.setup import engine
from src.database.model import get_db, User

from src.routes import auth_route, websocket_route, message_route

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # "https://your-production-domain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # list of allowed origins
    allow_credentials=True,           # allow cookies/auth headers
    allow_methods=["*"],              # allow all HTTP methods
    allow_headers=["*"],              # allow all headers
)

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

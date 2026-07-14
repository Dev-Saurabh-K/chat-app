
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.database.model import get_db, User
from src.auth.auth import verify_password, hash_password, create_access_token, get_current_user
from src.schema.user import RegisterResponse, LoginResponse, RegisterRequest

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/test")
def test_auth(current_user: User = Depends(get_current_user)):
    return(
        {
            current_user
        }
    )

@router.post("/register", response_model=RegisterResponse)
def register(form_data: RegisterRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()

    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already taken")

    if not user:
        hashed_password = hash_password(form_data.password)
        new_user = User(username = form_data.username, password = hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
@router.post("/login", response_model=LoginResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()

   
    # if not user or not verify_password(form_data.password, user.password): # type: ignore
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if not verify_password(form_data.password, user.password): # type: ignore
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong password")
    
    # create jwt
    access_token = create_access_token(data={"sub":user.username})
    return {"access_token": access_token, "token_type":"bearer"}


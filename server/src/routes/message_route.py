from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_
from src.database.model import User, Message, get_db
from src.auth.auth import get_current_user
from src.schema.message import MessageRetrieveResponse
from typing import List

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/test")
def test_user():
    return ({"kk":"se"})

@router.get("/retrieve/message", response_model=List[MessageRetrieveResponse])
async def get_message_for_from_with_to(to_id:int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    messages = db.query(Message).filter(and_(Message.sender_id==current_user.id, Message.receiver_id==to_id)).all()
    return messages
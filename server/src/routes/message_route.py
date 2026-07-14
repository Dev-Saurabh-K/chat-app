from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from src.database.model import User, Message, get_db
from src.auth.auth import get_current_user
from src.schema.message import MessageRetrieveResponse
from src.schema.user import UserListResponse
from typing import List

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/test")
def test_user():
    return ({"kk":"se"})

# @router.get("/retrieve/message", response_model=List[MessageRetrieveResponse])
# async def get_message_for_from_with_to(
#     to_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     # Get messages sent by 'to_id' to the current user
#     messages = db.query(Message).filter(
#         and_(Message.receiver_id == current_user.id, Message.sender_id == to_id)
#     ).all()

#     # Mark them as seen
#     for message in messages:
#         message.status = 2
#     db.commit()

#     return messages

@router.get("/retrieve/message", response_model=List[MessageRetrieveResponse])
async def get_conversation_with_user(
    to_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Bulk update: mark all messages sent by `to_id` to current user as seen
    db.query(Message).filter(
        and_(
            Message.receiver_id == current_user.id,
            Message.sender_id == to_id
        )
    ).update({Message.status: 2}, synchronize_session=False)
    db.commit()

    # Retrieve the full conversation (both directions)
    messages = db.query(Message).filter(
        or_(
            and_(Message.sender_id == current_user.id, Message.receiver_id == to_id),
            and_(Message.sender_id == to_id, Message.receiver_id == current_user.id)
        )
    ).order_by(Message.created_at).all()

    return messages

@router.get("/retrieve/users", response_model=List[UserListResponse])
async def get_other_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    users = db.query(User).filter(User.id != current_user.id).all()
    return users






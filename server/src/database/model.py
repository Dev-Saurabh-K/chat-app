from sqlalchemy import Column, Integer, String, DateTime,ForeignKey,Boolean, func
from sqlalchemy.orm import Mapped, mapped_column
from .setup import Base, sessionLocal
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String)
    password: Mapped[str] =  mapped_column(String)
    active_status: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    sender_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    receiver_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"))
    content: Mapped[str] = mapped_column(String)
    status: Mapped[int] = mapped_column(Integer, default=0)
    # 1 for sent, 2 for delivered
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())




def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()


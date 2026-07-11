from fastapi import WebSocket, HTTPException, status
from sqlalchemy.orm import Session
from src.database.model import User

def get_user_by_id(user_id: int, db: Session) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail=f"User with ID {user_id} is not registered"
        )
    return user

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}
    
    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)
    
    async def send_message_to(self, message: str, sender_id: int, target_user_id: int):
        websocket = self.active_connections.get(target_user_id)
        if websocket:
            payload = {
                "sender_id": sender_id,
                "message": message
            }

            await websocket.send_json(payload)


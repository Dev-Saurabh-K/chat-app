from fastapi import WebSocket, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database.model import User, get_db

def ws_get_user(user_id: int | None, db: Session = Depends(get_db)):
    # handle none user_id if error or problem

    user = db.query(User).filter(User.id == user_id).first()
    
    if user is None:
        raise  HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not registered")
    
    return user

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}
    
    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)
    
    async def send_message_to(self, message: str, target_user_id: int):
        websocket = self.active_connections.get(target_user_id)
        if websocket:
            await websocket.send_text(message)
# @app.websocket("/ws/{user_id}")
# async def websocket_endpoint(websocket: WebSocket, user_id: str):
#     await manager.connect(user_id, websocket)
#     try:
#         while True:
#             data = await websocket.receive_text()
#             # Expect data like "to:Bob|Hello"
#             if "|" in data:
#                 target, msg = data.split("|", 1)
#                 target = target.replace("to:", "")
#                 await manager.send_personal_message(f"{user_id} says: {msg}", target)
#     except WebSocketDisconnect:
#         manager.disconnect(user_id)

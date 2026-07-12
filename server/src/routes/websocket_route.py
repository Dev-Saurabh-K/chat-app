from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query, HTTPException

from sqlalchemy.orm import Session
from .websocket_config import get_user_by_id, ConnectionManager
from src.database.model import get_db, Message

router = APIRouter()
manager = ConnectionManager()

# ws://localhost:8000/ws?from=1&to=2
@router.websocket("/ws")
@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    from_id: int = Query(..., alias="from"),
    to_id: int = Query(..., alias="to"),
    db: Session = Depends(get_db)
):
    try:
        current_user = get_user_by_id(from_id, db)
        target_user = get_user_by_id(to_id, db)
    except HTTPException as e:
        raise  e
    


    # await websocket.accept()
    await manager.connect(from_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()

            # save message
            save_message = Message(sender_id=from_id, receiver_id=to_id, content=data)
            db.add(save_message)
            db.commit()
            
            await manager.send_message_to(message=data, sender_id=from_id, target_user_id=to_id)

    except WebSocketDisconnect:
        manager.disconnect(from_id)

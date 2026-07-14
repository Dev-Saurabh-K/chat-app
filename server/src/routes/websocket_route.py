from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query, HTTPException

from sqlalchemy.orm import Session
from .websocket_config import get_user_by_id, ConnectionManager
from src.database.model import get_db, Message, User

router = APIRouter()
manager = ConnectionManager()

# ws://localhost:8000/ws?from=1&to=2
# @router.websocket("/ws")
# async def websocket_endpoint(
#     websocket: WebSocket,
#     from_id: int = Query(..., alias="from"),
#     to_id: int = Query(..., alias="to"),
#     db: Session = Depends(get_db)
# ):
#     try:
#         current_user = get_user_by_id(from_id, db)
#         target_user = get_user_by_id(to_id, db)
#     except HTTPException as e:
#         raise  e
    


#     # await websocket.accept()
#     user = db.query(User).filter(User.id == from_id).first()
#     if user:
#         user.active_status = True
#         db.commit()
#     await manager.connect(from_id, websocket)

#     try:
#         while True:
#             data = await websocket.receive_text()
#             to_user = db.query(User).filter(User.id == to_id).first()

#             if to_user:
#                 status_value = 2 if to_user.active_status else 1

#                 # Save message
#                 save_message = Message(
#                     sender_id=from_id,
#                     receiver_id=to_id,
#                     content=data,
#                     status=status_value
#                 )
#                 db.add(save_message)
#                 db.commit()
#                 db.refresh(save_message)
            
#             await manager.send_message_to(message=data, sender_id=from_id, target_user_id=to_id)


#     except WebSocketDisconnect:
#         if user:
#             user.active_status=False
#             db.commit()
#         manager.disconnect(from_id)

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
        await websocket.close(code=1008)  # Policy Violation
        return

    await websocket.accept()
    user = db.query(User).filter(User.id == from_id).first()
    if user:
        user.active_status = True
        db.commit()

    await manager.connect(from_id, websocket)

    try:
        while True:
            data = await websocket.receive_text()
            to_user = db.query(User).filter(User.id == to_id).first()

            status_value = 2 if to_user and to_user.active_status else 1

            save_message = Message(
                sender_id=from_id,
                receiver_id=to_id,
                content=data,
                status=status_value
            )
            db.add(save_message)
            db.commit()
            db.refresh(save_message)

            await manager.send_message_to(
                message=data,
                sender_id=from_id,
                target_user_id=to_id
            )

    except WebSocketDisconnect:
        if user:
            user.active_status = False
            db.commit()
        manager.disconnect(from_id)


from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from .websocket_config import ws_get_user, User

router = APIRouter()

# ws://localhost:8000/ws?from=1&to=2
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket ):

    # extracting userid from params
    params = websocket.query_params
    user_id_string: str | None = params.get("from")
    target_user_id_string: str | None = params.get("to")
    user_id: int | None = int(user_id_string) if user_id_string is not None else None
    target_user_id: int | None = int(target_user_id_string) if target_user_id_string is not None else None


    # print(get_user(user_id=user_id))

    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        print("Client disconnected")

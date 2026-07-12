from pydantic import BaseModel
from datetime import datetime

class MessageRetrieveResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    content: str
    created_at: datetime
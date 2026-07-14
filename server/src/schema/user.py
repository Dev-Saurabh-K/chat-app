from pydantic import BaseModel
from datetime import datetime

class RegisterRequest(BaseModel):
    username: str
    password: str

class RegisterResponse(BaseModel):
    id: int
    username: str
    password: str
    created_at: datetime

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    username: str
    id: int

class UserListResponse(BaseModel):
    id: int
    username: str
    active_status: bool
    created_at: datetime

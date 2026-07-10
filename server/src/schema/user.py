from pydantic import BaseModel

class RegisterResponse(BaseModel):
    id: int
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
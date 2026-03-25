from fastapi import Header, HTTPException


def get_user_id(x_user_id: str = Header(None)):
    if not x_user_id:
        raise HTTPException(status_code=400, detail="User ID missing")
    return x_user_id

from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from uuid import UUID
from typing import Optional


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    deadline: datetime


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[datetime] = None


class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    description: Optional[str]
    deadline: datetime
    is_completed: bool
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

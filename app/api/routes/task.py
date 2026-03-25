from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskResponse
from app.crud.task import create_task

router = APIRouter()


@router.post("/", response_model=TaskResponse)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)

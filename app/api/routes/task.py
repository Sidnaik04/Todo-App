from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskUpdate
from app.crud.task import (
    create_task,
    get_tasks,
    update_task,
    mark_task_complete,
    delete_task,
    get_task_by_id,
)

router = APIRouter()


@router.post("/", response_model=TaskResponse)
def create_new_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)


@router.get("/", response_model=List[TaskResponse])
def read_task(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    return get_tasks(db, limit=limit, offset=offset)


@router.put("/{task_id}", response_model=TaskResponse)
def update_existing_task(
    task_id: UUID, task_data: TaskUpdate, db: Session = Depends(get_db)
):
    task = update_task(db, task_id, task_data)

    if not task:
        raise HTTPException(status_code=404, detail="task not found")

    return task


@router.patch("/{task_id}/complete", response_model=TaskResponse)
def complete_task(task_id: UUID, db: Session = Depends(get_db)):
    task = mark_task_complete(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.delete("/{task_id}")
def remove_task(task_id: UUID, db: Session = Depends(get_db)):
    task = delete_task(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}


@router.get("/{task_id}", response_model=TaskResponse)
def read_single_task(task_id: UUID, db: Session = Depends(get_db)):
    task = get_task_by_id(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="task not found")

    return task

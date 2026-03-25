from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate
from datetime import datetime, UTC
from uuid import UUID


# create a new task
def create_task(db: Session, task: TaskCreate):
    db_task = Task(
        title=task.title, description=task.description, deadline=task.deadline
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


# list all the task
def get_tasks(db: Session, limit: int = 10, offset: int = 10):
    return (
        db.query(Task)
        .filter(Task.is_deleted == False)
        .order_by(Task.deadline.asc())
        .offset(offset)
        .limit(limit)
        .all()
    )


# get single task with id
def get_task_by_id(db: Session, task_id: UUID):
    return db.query(Task).filter(Task.id == task_id, Task.is_deleted == False).first()


# update the task
def update_task(db: Session, task_id: UUID, task_data: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id, Task.is_deleted == False).first()

    if not task:
        return None

    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
        task.description = task_data.description

    if task_data.deadline is not None:
        task.deadline = task_data.deadline

    db.commit()
    db.refresh(task)
    return task


# mark task as complete
def mark_task_complete(db: Session, task_id: UUID):
    task = db.query(Task).filter(Task.id == task_id, Task.is_deleted == False).first()

    if not task:
        return None

    task.is_completed = True
    task.completed_at = datetime.now(UTC)

    db.commit()
    db.refresh(task)
    return task


# delete task
def delete_task(db: Session, task_id: UUID):
    task = db.query(Task).filter(Task.id == task_id, Task.is_deleted == False).first()

    if not task:
        return None

    task.is_deleted = True

    db.commit()
    return task

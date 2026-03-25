from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate
from datetime import datetime


def create_task(db: Session, task: TaskCreate):
    db_task = Task(
        title=task.title, description=task.description, deadline=task.deadline
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task

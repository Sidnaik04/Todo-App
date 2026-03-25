from fastapi import FastAPI
from app.api.routes import task
from app.core.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(task.router, prefix="/tasks", tags=["Tasks"])


@app.get("/")
def root():
    return {"message": "Todo API running..."}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import task
from app.core.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router, prefix="/tasks", tags=["Tasks"])


@app.get("/root")
def root():
    return {"message": "Todo API running..."}

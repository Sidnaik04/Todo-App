# 📝 Todo App

A full-stack todo application built with **FastAPI** (backend) and **React** (frontend).

Live Demo: `https://your-app.vercel.app`  
API Docs: `https://your-backend.onrender.com/docs`

## 🚀 Features

- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as completed
- ✅ Responsive mobile-first UI
- ✅ PostgreSQL database with SQLAlchemy ORM
- ✅ RESTful API with FastAPI

## 📦 Tech Stack

**Backend:**

- FastAPI
- SQLAlchemy 2.0
- PostgreSQL
- Pydantic v2

**Frontend:**

- React 19
- TailwindCSS v4
- Axios
- Day.js

## 📂 Project Structure

```
todo-backend/
├── app/
│   ├── api/routes/     # API endpoints
│   ├── core/           # Database config
│   ├── crud/           # Database operations
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   ├── tests/          # Unit tests
│   └── main.py         # FastAPI app
├── requirements.txt
└── .env
```

```
todo-frontend/
├── src/
│   ├── api/            # API client
│   ├── components/     # React components
│   ├── pages/          # Page components
│   └── App.jsx
└── package.json
```

## 🔌 API Endpoints

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| POST   | `/tasks`               | Create task        |
| GET    | `/tasks`               | Get all tasks      |
| GET    | `/tasks/{id}`          | Get task by ID     |
| PUT    | `/tasks/{id}`          | Update task        |
| PATCH  | `/tasks/{id}/complete` | Mark task complete |
| DELETE | `/tasks/{id}`          | Delete task        |

## ⚙️ Setup

### Backend

```bash
# Navigate to backend
cd todo-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://user:password@localhost:5432/todo_db" > .env

# Run server
uvicorn app.main:app --reload
```

Backend runs on: `http://127.0.0.1:8000`

### Frontend

```bash
# Navigate to frontend
cd todo-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://127.0.0.1:8000" > .env

# Run dev server
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🧪 Testing

```bash
cd todo-backend
pytest
```

## 📝 Notes

- Update `DATABASE_URL` in `.env` with your PostgreSQL credentials
- Both backend and frontend need `.env` files in their respective directories
- Ensure PostgreSQL is running before starting the backend

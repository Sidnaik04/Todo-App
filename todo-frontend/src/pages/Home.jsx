import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };
    loadTasks();
    localStorage.setItem("visited", true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex justify-center items-start pt-4 px-4 pb-6 sm:pt-8 sm:pb-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-5 sm:p-6 border border-gray-300">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">To-Do List</h1>
          <p className="text-xs sm:text-sm text-gray-600 mb-5">My tasks</p>

          {/* Task Count and Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <p className="text-xs sm:text-sm text-gray-700">
              You have {tasks.filter((t) => !t.is_completed).length} tasks left!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-black text-white px-5 sm:px-4 py-3 sm:py-2 rounded-lg text-sm font-medium hover:bg-gray-800 active:bg-gray-900 transition"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 && (
              <div className="text-center text-gray-500 py-12">
                <p className="text-lg">No tasks yet 👀</p>
                <p className="text-sm mt-2">Click "Add Task" to get started</p>
              </div>
            )}
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                refresh={fetchTasks}
                onEdit={(t) => {
                  setEditTask(t);
                  setShowModal(true);
                }}
              />
            ))}
          </div>

          {/* Footer */}
          {tasks.length > 0 && (
            <p className="text-xs text-center mt-6 text-gray-500">
              Displaying {tasks.length} out of {tasks.length}
            </p>
          )}

          <p className="text-xs text-center mt-4 text-gray-400">
            Developed by Sidhant Naik
          </p>
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          editTask={editTask}
          onClose={() => {
            setShowModal(false);
            setEditTask(null);
          }}
          refresh={fetchTasks}
        />
      )}
    </div>
  );
}

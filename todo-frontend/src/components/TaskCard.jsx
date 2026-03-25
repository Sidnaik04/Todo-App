import dayjs from "dayjs";
import { deleteTask, completeTask } from "../api/taskApi";
import { Pencil, Trash2, Calendar, CheckSquare } from "lucide-react";

export default function TaskCard({ task, refresh, onEdit }) {
  const handleDelete = async () => {
    await deleteTask(task.id);
    refresh();
  };

  const handleComplete = async () => {
    await completeTask(task.id);
    refresh();
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl p-3 sm:p-4 flex items-start gap-3 hover:shadow-md active:shadow-lg transition bg-gray-50 active:bg-gray-100">
      {/* Checkbox */}
      <button
        onClick={handleComplete}
        className={`flex-shrink-0 w-7 h-7 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center font-bold text-sm transition active:scale-95 ${
          task.is_completed
            ? "bg-black text-white border-black"
            : "border-gray-400 text-gray-400 hover:border-gray-600"
        }`}
      >
        {task.is_completed && "✓"}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2
          className={`font-semibold text-sm sm:text-base ${
            task.is_completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {task.title}
        </h2>

        {task.description && (
          <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
            {task.description}
          </p>
        )}

        <p className="text-xs text-red-500 font-medium mt-2">
          Due {dayjs(task.deadline).format("DD MMM YYYY")}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="p-2 sm:p-1 text-lg sm:text-xl text-gray-600 hover:text-gray-900 active:bg-gray-200 rounded transition"
          aria-label="Edit task"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 sm:p-1 text-lg sm:text-xl text-gray-600 hover:text-red-600 active:bg-red-100 rounded transition"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

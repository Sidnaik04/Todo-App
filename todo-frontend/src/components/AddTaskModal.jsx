import { useState } from "react";
import { createTask, updateTask } from "../api/taskApi";

export default function AddTaskModal({ onClose, refresh, editTask }) {
  const [form, setForm] = useState(() => {
    if (editTask) {
      return {
        title: editTask.title,
        description: editTask.description || "",
        deadline: editTask.deadline?.slice(0, 10),
      };
    }
    return {
      title: "",
      description: "",
      deadline: "",
    };
  });

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    if (editTask) {
      await updateTask(editTask.id, {
        ...form,
        deadline: form.deadline + "T00:00:00",
      });
    } else {
      await createTask({
        ...form,
        deadline: form.deadline + "T00:00:00",
      });
    }
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-end sm:items-center px-4 z-50">
      <div className="bg-white p-5 sm:p-6 rounded-t-3xl sm:rounded-3xl w-full max-w-sm shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {editTask ? "Edit Task" : "Add Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 active:bg-gray-100 rounded text-2xl font-light transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-5">
          <label className="text-xs sm:text-sm font-medium text-gray-800 mb-2 block">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-base sm:text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            placeholder="Write up chemistry lab report"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description Input */}
        <div className="mb-5">
          <label className="text-xs sm:text-sm font-medium text-gray-800 mb-2 block">
            Description <span className="text-gray-400">(Optional)</span>
          </label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-base sm:text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
            placeholder="Add more details"
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Deadline Input */}
        <div className="mb-6">
          <label className="text-xs sm:text-sm font-medium text-gray-800 mb-2 block">
            Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-base sm:text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 sm:py-2 rounded-lg font-medium hover:bg-gray-900 active:bg-gray-950 transition text-sm sm:text-base"
        >
          {editTask ? "Update Task" : "Add Task"}
        </button>

        {/* Footer */}
        <p className="text-xs text-center mt-6 text-gray-400">
          Developed by Sidhant Naik
        </p>
      </div>
    </div>
  );
}

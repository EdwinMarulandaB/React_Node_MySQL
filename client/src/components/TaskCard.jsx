import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const handleDone = async (taskId) => {
    await toggleTaskDone(taskId);
  };

  return (
    <div className="bg-slate-300 rounded-md px-4 py-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done == 1 ? "✔️" : "❌"}</span>
      </header>

      <p className="text-xs">{task.description}</p>

      <span>{task.createdAt}</span>
      <div className="flex gap-2">
        <button className="bg-red-500 px-2 py-1 text-white" onClick={() => deleteTask(task.id)}>Delete</button>
        <button className="bg-slate-700 px-2 py-1 text-white" onClick={() => navigate(`/edit/${task.id}`)}>Edit</button>
        <button className="bg-green-600 px-2 py-1 text-white" onClick={() => handleDone(task.id)}>Toggle Task</button>
      </div>
    </div>
  );
}

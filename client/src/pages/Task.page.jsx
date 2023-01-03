import React from "react";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard.jsx";
import { useTasks } from "../context/TaskContext";

export default function TaskPages() {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length == 0) return <h1>No Tasks Yet</h1>;
    return tasks.map((task, i) => <TaskCard task={task} key={i} />);
  }

  return (
    <div >
      <h1 className="text-5xl text-white text-center mb-5">Tasks</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>
    </div>
  );
}

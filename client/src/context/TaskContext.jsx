import { useContext, createContext, useState } from "react";
import {
  getTasksRequest,
  deleteTaskRequest,
  createTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/task.api.js";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContextProvider");
  }

  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const response = await getTasksRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      if (response) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      await createTaskRequest(task);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      if (response) {
        const newTask = await getTask(id);
        const x = tasks.findIndex((t) => t.id === id);
        tasks[x] = newTask;
        setTasks(tasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find((t) => t.id === id);

      await updateTaskRequest(
        id,
        taskFound.done === 0 ? { done: true } : { done: false }
      );

      /* ///Forma de modificar un objeto de manera simple
      const x = {...tasks[1],title:"Los camellos cantan",done:"hola",adrres:"Calle 75"} 
      console.log(x);
      */

      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, done: (t.done = t.done === 0 ? 1 : 0) } : t
        )
      );
    } catch (error) {}
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toggleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

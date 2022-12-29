import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFound.page.jsx";
import Taskpage from "./pages/Task.page.jsx";
import TaskForm from "./pages/Taskform.page.jsx";
import Navbar from "./components/Navbar.jsx";
import { TaskContextProvider } from "./context/TaskContext.jsx";

export default function App() {
  return (
    <TaskContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Taskpage />}></Route>
        <Route path="/new" element={<TaskForm />}></Route>
        <Route path="/edit/:id" element={<TaskForm />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </TaskContextProvider>
  );
}

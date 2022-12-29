import {useNavigate} from 'react-router-dom'
import {useTasks} from '../context/TaskContext'

export default function TaskCard({task}) {

  const {deleteTask,toggleTaskDone}= useTasks()
  const navigate = useNavigate()
  const handleDone= async(taskId)=>{
    await toggleTaskDone(taskId)
  }
   
  return (
    <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span>{task.done == 1 ? "✔️":"❌"}</span>
            <span>{task.createdAt}</span>
            <button onClick={()=>deleteTask(task.id)}>Delete</button>
            <button onClick={()=>navigate(`/edit/${task.id}`)}>Edit</button>
            <button onClick={()=>handleDone(task.id)}>Toggle Task</button>
          </div>
  )
}

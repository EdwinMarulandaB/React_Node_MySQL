import { Formik, Form } from "formik";
import { useEffect,useState } from "react";
import {useParams,useNavigate} from 'react-router-dom'

import {useTasks} from '../context/TaskContext'

function TaskForm() {

  const navigate = useNavigate()
  const {createTask,getTask,updateTask}=useTasks()
  const params=useParams()
  const [task, setTask] = useState({
    title:'',
    description:''
  })


  useEffect(()=>{
  (async()=>{
      if (params.id) {
        const response = await getTask(params.id)
        setTask({
          title:response.title,
          description:response.description
        })
      }
    })()
  },[])
  
  return (
    <div>

      <h1>{
        params.id ? "Edit Task": "Create Task"
        }</h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values,actions) => {
          if (params.id) {
            await updateTask(parseInt(params.id),values)
            navigate("/")
          }else{
            await createTask(values)
          }
          setTask({
            title:'',
            description:''
          })
          actions.resetForm()
        }}
      >
        {({ handleChange, handleSubmit ,values,isSubmitting}) => (
          <Form onSubmit={handleSubmit}>
            <label>title</label>
            <input
              type="text"
              name="title"
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
            />
            <label>description</label>
            <textarea
              placeholder="Type a description of task"
              name="description"
              rows="3"
              onChange={handleChange}
              value={values.description}
            />
            <button type="submit" disabled={isSubmitting}>{
              isSubmitting ? "Saving..." : "Save"
            }</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;

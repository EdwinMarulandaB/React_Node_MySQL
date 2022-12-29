import { Router } from "express";
import ctlTask from '../controllers/task.controllers.js'
const router = Router();


router.get('/',ctlTask.getTasks);

router.get('/:id',ctlTask.getTask);

router.post('/',ctlTask.createTask);

router.put('/:id',ctlTask.updateTask);


router.delete('/:id',ctlTask.deleteTask);


export default router;

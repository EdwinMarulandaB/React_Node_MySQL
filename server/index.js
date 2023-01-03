import express from "express";
import config from "./config.js";
import indexrute from "./routes/index.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import morgan from 'morgan'
import cors from 'cors'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'

const app = express();
const _dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json());
app.set("port", config.PORT);

app.use(indexrute);
app.use(morgan('dev'));
app.use(cors())
app.use("/task", tasksRoutes);

app.use(express.static(join(_dirname,'../client/dist')))

app.listen(app.get("port"));

console.log("Server is running on port", app.get("port"));

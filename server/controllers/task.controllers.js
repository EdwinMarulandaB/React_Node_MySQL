import { pool } from "../db.js";


const getTask = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tasks where id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Task not found" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks ORDER BY createdAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await pool.query("INSERT INTO tasks SET ?", {
      title,
      description,
    });
    res.json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE tasks SET ? WHERE id =?", [
      req.body,
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });

    let x = result.info.split(":");
    let info = x[2].split(" ");

    if (info[1] === "0")
      return res
        .status(404)
        .json({ message: "Task found but is the same that ingreset" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};

import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
const data = fs.readFileSync(process.cwd() + "/public/data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/", (req, res) => {
  return res.json({ message: "Successfully", data: JSON.parse(data) });
});

app.post("/api/", (req, res) => {
  const { title, completed } = req.body;
  const todos = JSON.parse(data);
  const payload = {
    id: todos.todos.length + 1,
    title,
    completed,
  };
  todos.todos.push(payload);
  return res.json({
    message: "Successfully",
    newTodo: {},
    todos: [],
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

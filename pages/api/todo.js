import { readTodolistDB, writeTodolistDB } from "../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function todoRoute(req, res) {
  if (req.method === "GET") {
    //get todos of that user
    const todolist = readTodolistDB();

    return res.json({
      ok: true,
      todolist,
    });
  } else if (req.method === "POST") {
    const todolist = readTodolistDB();

    if (
      typeof req.body.title !== "string" ||
      req.body.title.length === 0 ||
      typeof req.body.completed !== "boolean"
    )
      return res.status(400).json({ ok: false, message: "Invalid Todo Data" });

    const newTodo = {
      id: uuidv4(),
      title: req.body.title,
      completed: req.body.completed,
    };

    todolist.push(newTodo);
    writeTodolistDB(todolist);

    return res.json({ ok: true, todo: newTodo });
  } else {
    return res.status(404).json({
      ok: false,
      message: "Invalid HTTP Method",
    });
  }
}

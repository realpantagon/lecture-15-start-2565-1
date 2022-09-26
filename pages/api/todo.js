import { readTodolistDB, writeTodolistDB } from "../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";
import { checkToken } from "../../backendLibs/checkToken";

export default function todoRoute(req, res) {
  if (req.method === "GET") {
    //check authen
    const username = checkToken(req);
    if (!username) {
      return res.status(401).json({
        ok: false,
        message: "You don't permission to access this api",
      });
    }

    //get todos of that user
    const todolist = readTodolistDB().filter((x) => x.username === username);

    return res.json({
      ok: true,
      todolist,
    });
  } else if (req.method === "POST") {
    //check authen
    const username = checkToken(req);
    if (!username) {
      return res.status(401).json({
        ok: false,
        message: "You don't permission to access this api",
      });
    }
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
      username,
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

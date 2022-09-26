import { readTodolistDB, writeTodolistDB } from "../../../backendLibs/dbLib";
import { checkToken } from "../../../backendLibs/checkToken";

export default function todoIdRoute(req, res) {
  if (req.method === "DELETE") {
    //check authen
    if (!username) {
      return res.status(401).json({
        ok: false,
        message: "You don't permission to access this api",
      });
    }
    const todolist = readTodolistDB();
    const id = req.query.id;

    const todoIdx = todolist.findIndex((x) => x.id === id);
    if (todoIdx === -1)
      return res
        .status(404)
        .json({ ok: false, message: "Todo ID does not exist" });
    //check authen
    if (todoIdx === -1) {
      return res.status(404).json({
        ok: false,
        message: "Todo ID does not exist",
      });
    }
    if (todolist[todoIdx].username !== username) {
      return res.status(403).json({
        ok: false,
        message: "You don't permission to access this data",
      });
    }
    todolist.splice(todoIdx, 1);
    writeTodolistDB(todolist);

    return res.json({ ok: true, id });
  } else if (req.method === "PUT") {
    //check authen
    if (!username) {
      return res.status(401).json({
        ok: false,
        message: "You don't permission to access this api",
      });
    }
    const todolist = readTodolistDB();
    const id = req.query.id;

    //validate body
    if (typeof req.body.completed !== "boolean")
      return res.status(400).json({ ok: false, message: "Invalid Input" });

    const todoIdx = todolist.findIndex((x) => x.id === id);
    if (todoIdx === -1)
      return res
        .status(404)
        .json({ ok: false, message: "Todo ID does not exist" });

    if (todolist[todoIdx].username !== username) {
      return res.status(403).json({
        ok: false,
        message: "You don't permission to access this data",
      });
    }
    todolist[todoIdx].completed = req.body.completed;
    writeTodolistDB(todolist);
    return res.json({ ok: true, todo: todolist[todoIdx] });
  }
}

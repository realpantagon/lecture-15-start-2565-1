import fs from "fs";

export function readTodolistDB() {
  const str = fs.readFileSync("db/todolist.json", {
    encoding: "utf-8",
  });
  const todolist = JSON.parse(str);
  return todolist;
}

export function writeTodolistDB(todolist) {
  const str = JSON.stringify(todolist);
  fs.writeFileSync("db/todolist.json", str, { encoding: "utf-8" });
}

export function readUsersDB() {
  const str = fs.readFileSync("db/users.json", {
    encoding: "utf-8",
  });
  const users = JSON.parse(str);
  return users;
}

export function writeUsersDB(users) {
  const str = JSON.stringify(users);
  fs.writeFileSync("db/users.json", str, { encoding: "utf-8" });
}

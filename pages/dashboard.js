import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState(null); //null = not logged-in , string = logged-in

  const router = useRouter();

  const callGetTodo = async () => {
    try {
      const resp = await axios.get("/api/todo");
      if (resp.data.ok) setTodos(resp.data.todolist);
    } catch (err) {
      console.log(err.response.data.mesasge);
    }
  };

  const callPostTodo = async () => {
    try {
      const resp = await axios.post("/api/todo", {
        title: todoText,
        completed: false,
      });
      if (resp.data.ok) await callGetTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const callDeleteTodo = async (id) => {
    try {
      const resp = await axios.delete(`/api/todo/${id}`);
      if (resp.data.ok) await callGetTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const callPutTodo = async (id, completed) => {
    try {
      const resp = await axios.put(`/api/todo/${id}`, {
        completed,
      });
      if (resp.data.ok) callGetTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    callGetTodo();
  }, []);

  return (
    <div>
      <input
        placeholder="Insert new todo..."
        onChange={(e) => setTodoText(e.target.value)}
        value={todoText}
        onKeyUp={(e) => {
          if (e.key !== "Enter") return;
          callPostTodo();
        }}
      />
      <ul>
        {todos.map((x) => (
          <li
            key={x.id}
            style={{ textDecoration: x.completed ? "line-through" : "none" }}
          >
            {x.title}
            <button
              onClick={() => {
                callPutTodo(x.id, !x.completed);
              }}
            >
              Done
            </button>
            <button
              onClick={() => {
                callDeleteTodo(x.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

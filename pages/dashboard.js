import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [username, setUsername] = useState(null); //null = not logged-in , string = logged-in

  const router = useRouter();

  const callGetTodo = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get("/api/todo", {
        headers: { Authorization: `bearer ${token}` },
      });

      if (resp.data.ok) setTodos(resp.data.todolist);
    } catch (err) {
      console.log(err.response.data.mesasge);
    }
  };

  const callPostTodo = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.post(
        "/api/todo",
        {
          title: todoText,
          completed: false,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      if (resp.data.ok) await callGetTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const callDeleteTodo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.delete(`/api/todo/${id}`, {
        headers: { Authorization: `bearer ${token}` },
      });
      if (resp.data.ok) await callGetTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const callPutTodo = async (id, completed) => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.put(
        `/api/todo/${id}`,
        {
          completed,
        },
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      if (resp.data.ok) callGetTodo();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const callUserTestToken = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.get("/api/user/testToken", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.data.ok) {
        setUsername(resp.data.username);
        callGetTodo();
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  useEffect(() => {
    callUserTestToken();
  }, []);

  return (
    <div>
      <p>Hi {username} !</p>
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
                localStorage.removeItem("token");
                router.push("/");
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

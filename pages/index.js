import axios from "axios";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const callUserLogin = async () => {
    try {
      const resp = await axios.post("/api/user/login", {
        username,
        password,
      });
      if (resp.data.ok) {
        localStorage.setItem("token", resp.data.token);
        Router.push("/dashboard");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div>
      <label>Username</label>
      <input
        placeholder="username..."
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br />
      <label>Password</label>
      <input
        placeholder="password..."
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            callUserLogin();
          }
        }}
      />
      <button onClick={() => callUserLogin()}>Login</button>
    </div>
  );
}

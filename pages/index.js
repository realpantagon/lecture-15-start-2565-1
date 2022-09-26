import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          }
        }}
      />
      <button onClick={() => alert(":)")}>Login</button>
    </div>
  );
}

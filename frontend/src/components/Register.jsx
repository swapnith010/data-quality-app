import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!user || !pass) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    alert("Account created ✅");
    navigate("/");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Create Account ✨</h2>

        <input
          style={input}
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          style={input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />

        <button style={button} onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

/* SAME STYLES AS LOGIN */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
};

const card = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(15px)",
  padding: "40px",
  borderRadius: "20px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const title = {
  textAlign: "center",
  color: "white",
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
};

const button = {
  padding: "10px",
  borderRadius: "8px",
  background: "#6366f1",
  color: "white",
  border: "none",
};
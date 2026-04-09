import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = localStorage.getItem("user");
    const savedPass = localStorage.getItem("pass");

    if (!user || !pass) {
      alert("Please enter all details");
      return;
    }

    if (!savedUser || !savedPass) {
      alert("No account found. Please register first.");
      return;
    }

    if (user === savedUser && pass === savedPass) {
      alert("Login successful ✅");
      navigate("/dashboard");   // 🔥 redirect to dashboard
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div style={container}>
      <div style={card}>

        <h2 style={title}>Welcome Back 🚀</h2>
        <p style={subtitle}>Login to your account</p>

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

        <button style={button} onClick={handleLogin}>
          Login
        </button>

        <p style={registerText}>
          No account?{" "}
          <span style={link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

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
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
};

const title = {
  textAlign: "center",
  color: "white",
};

const subtitle = {
  textAlign: "center",
  color: "#cbd5f5",
  marginBottom: "10px",
};

const input = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const button = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#6366f1",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const registerText = {
  color: "white",
  textAlign: "center",
};

const link = {
  color: "#a5b4fc",
  cursor: "pointer",
};
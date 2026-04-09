import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "./upload";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [stats, setStats] = useState({
    rows: 0,
    columns: 0,
    duplicates: 0,
    score: 0
  });

  return (
    <div style={container}>

      {/* Sidebar */}
      <div style={sidebar}>
        <h2 style={{ marginBottom: "30px" }}>🚀 Data App</h2>

        <div style={menuItem}>📊 Dashboard</div>

        <div style={menuItem} onClick={() => navigate("/")}>
          🚪 Logout
        </div>
      </div>

      {/* Main */}
      <div style={main}>
        <h1 style={welcome}>Welcome, {user} 👋</h1>

        {/* Cards */}
        <div style={cards}>
          <div style={card}>
            <h3>Total Files</h3>
            <p>{stats.rows}</p>
          </div>

          <div style={card}>
            <h3>Errors Found</h3>
            <p>{stats.total_errors}</p>
          </div>

          <div style={card}>
            <h3>Quality Score</h3>
            <p>{stats.score}%</p>
          </div>
        </div>

        <Upload setStats={setStats} />

      </div>
    </div>
  );
}

/* 🎨 FINAL STYLES */

const container = {
  display: "flex",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
  color: "white"
};

const sidebar = {
  width: "240px",
  padding: "25px",
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 20px rgba(0,0,0,0.5)"
};

const menuItem = {
  marginTop: "15px",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s"
};

menuItem[":hover"] = {
  background: "rgba(255,255,255,0.1)"
};

const main = {
  flex: 1,
  padding: "40px"
};

const welcome = {
  marginBottom: "20px"
};

const cards = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px"
};

const card = {
  flex: 1,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
};

card[":hover"] = {
  transform: "scale(1.05)"
};
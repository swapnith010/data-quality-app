import { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";

export default function Upload({ setStats }) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select file first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData);
      setResult(res.data);
      setStats(res.data);
    } catch {
      alert("Backend error ❌");
    }

    setLoading(false);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Data Quality Report", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Rows: ${result.rows}`, 20, 40);
    pdf.text(`Columns: ${result.columns}`, 20, 50);
    pdf.text(`Duplicates: ${result.duplicates}`, 20, 60);
    pdf.text(`Score: ${result.score}`, 20, 70);

    pdf.text("Issues:", 20, 90);

    let y = 100;

    result.errors.forEach((err) => {
      if (y > 280) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(`- ${err}`, 20, y);
      y += 10;
    });

    pdf.save("Data_Report.pdf");
  };

  const chartData = result
    ? {
        labels: Object.keys(result.missing),
        datasets: [
          {
            label: "Missing Values",
            data: Object.values(result.missing),
          },
        ],
      }
    : null;

  return (
    <div style={container}>

      <h2>Upload File 📂</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button style={button} onClick={handleUpload}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {loading && <p>⏳ Processing file...</p>}

      {result && (
        <div style={resultBox}>

          <h3>Report 📊</h3>

          <p>Rows: {result.rows}</p>
          <p>Columns: {result.columns}</p>
          <p>Duplicates: {result.duplicates}</p>
          <p>Score: {result.score}</p>

          <h3>Issues:</h3>
          <div style={errorContainer}>
            {result.errors.map((err, i) => (
              <div key={i} style={errorItem}>
                ⚠️ {err}
              </div>
            ))}
          </div>

          <h3>Chart 📊</h3>
          <Bar data={chartData} />

          <button style={pdfBtn} onClick={downloadPDF}>
            Download Report 📄
          </button>

        </div>
      )}

    </div>
  );
}

/* styles */

const container = {
  marginTop: "40px",
  padding: "25px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "15px"
};

const button = {
  marginTop: "10px",
  padding: "10px",
  borderRadius: "8px",
  background: "#6366f1",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const resultBox = {
  marginTop: "20px"
};

const errorContainer = {
  maxHeight: "300px",
  overflowY: "auto",
  marginTop: "10px",
  padding: "10px",
  background: "rgba(0,0,0,0.3)",
  borderRadius: "10px"
};

const errorItem = {
  color: "#ff6b6b"
};

const pdfBtn = {
  marginTop: "20px",
  padding: "10px",
  borderRadius: "8px",
  background: "green",
  color: "white",
  border: "none"
};
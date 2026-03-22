import React, { useState } from "react";
import "./Home.css";

const AdminDashboard = () => {
  const [tokens, setTokens] = useState([
    { id: "TK-001", patient: "Aman Gupta", department: "OPD", time: "10:30 AM" },
    { id: "TK-002", patient: "Sriya Das", department: "Cardiology", time: "10:45 AM" },
    { id: "TK-003", patient: "Vikram Rathore", department: "Emergency", time: "11:00 AM" },
  ]);

  const deleteToken = (id) => {
    if (window.confirm(`Are you sure you want to remove ${id}?`)) {
      setTokens(tokens.filter(t => t.id !== id));
    }
  };

  return (
    <div className="theme-transition min-vh-100 py-5 mt-5">
      <div className="container px-5">
        <h2 className="theme-text fw-bold mb-4">Admin <span className="text-primary">Token Control</span></h2>
        <div className="card custom-card border-0 shadow-sm">
          <table className="table align-middle mb-0">
            <thead className="bg-primary text-white">
              <tr>
                <th className="ps-4">Token ID</th>
                <th>Patient</th>
                <th>Department</th>
                <th>Time</th>
                <th className="text-end pe-4">Manage</th>
              </tr>
            </thead>
            <tbody className="theme-text">
              {tokens.map((t) => (
                <tr key={t.id}>
                  <td className="ps-4 fw-bold">{t.id}</td>
                  <td>{t.patient}</td>
                  <td><span className="badge bg-secondary">{t.department}</span></td>
                  <td>{t.time}</td>
                  <td className="text-end pe-4">
                    <button onClick={() => deleteToken(t.id)} className="btn btn-sm btn-outline-danger rounded-pill px-3">
                      <i className="bi bi-trash me-1"></i> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
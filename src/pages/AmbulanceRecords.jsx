import React from "react";
import { Link } from "react-router-dom";
import "./home.css"; 

const AmbulanceRecords = () => {
  // Mock data for emergency tracking
  const records = [
    { id: "AMB-102", patient: "Rajesh Kumar", status: "En Route", ETA: "4 mins", severity: "High" },
    { id: "AMB-085", patient: "Sita Devi", status: "Arrived", ETA: "0 mins", severity: "Critical" },
    { id: "AMB-112", patient: "Arjun Singh", status: "Dispatching", ETA: "12 mins", severity: "Medium" },
    { id: "AMB-099", patient: "Unknown (Trauma)", status: "En Route", ETA: "7 mins", severity: "High" },
  ];

  return (
    <div className="theme-transition min-vh-100 py-5 mt-5">
      <div className="container px-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="display-5 fw-bold theme-text">
              Ambulance <span className="text-primary">Records</span>
            </h1>
            <p className="theme-text-muted">Real-time emergency arrival tracking and triage status.</p>
          </div>
          <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i> Back to Home
          </Link>
        </div>

        {/* Live Tracker Table */}
        <div className="card custom-card border-0 shadow-lg overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3">Vehicle ID</th>
                  <th className="py-3">Patient Name</th>
                  <th className="py-3">Severity</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">ETA</th>
                  <th className="py-3 text-end px-4">Action</th>
                </tr>
              </thead>
              <tbody className="theme-text">
                {records.map((rec, i) => {
                  // Logic: If status is En Route or Dispatching, it's "Active" (Blue)
                  const isActive = rec.status === "En Route" || rec.status === "Dispatching";
                  
                  return (
                    <tr key={i} className={`border-bottom border-light ${isActive ? 'bg-active-light' : ''}`}>
                      <td className="px-4 fw-bold text-primary">{rec.id}</td>
                      <td className={isActive ? "text-primary fw-bold" : ""}>{rec.patient}</td>
                      <td>
                        <span className={`badge rounded-pill ${
                          rec.severity === 'Critical' ? 'bg-danger' : 
                          rec.severity === 'High' ? 'bg-warning text-dark' : 'bg-info'
                        }`}>
                          {rec.severity}
                        </span>
                      </td>
                      <td>
                        <div className={`d-flex align-items-center ${isActive ? 'text-primary fw-bold' : ''}`}>
                          <span className={`spinner-grow spinner-grow-sm me-2 ${
                            rec.status === 'Arrived' ? 'text-success' : 'text-primary'
                          }`} role="status"></span>
                          {rec.status}
                        </div>
                      </td>
                      <td className={isActive ? "text-primary fw-bold" : "fw-bold"}>{rec.ETA}</td>
                      <td className="text-end px-4">
                        <button className={`btn btn-sm rounded-pill px-3 ${
                          isActive ? 'btn-primary' : 'btn-outline-secondary'
                        }`}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="row g-4 mt-4">
          <div className="col-md-4">
            <div className="card custom-card p-4 text-center border-0 shadow-sm">
              <h3 className="h1 fw-bold text-danger">02</h3>
              <p className="mb-0 theme-text-muted">Active Emergencies</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card p-4 text-center border-0 shadow-sm">
              <h3 className="h1 fw-bold text-primary">08</h3>
              <p className="mb-0 theme-text-muted">Available Units</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card p-4 text-center border-0 shadow-sm">
              <h3 className="h1 fw-bold text-success">14</h3>
              <p className="mb-0 theme-text-muted">Total Arrivals Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceRecords;
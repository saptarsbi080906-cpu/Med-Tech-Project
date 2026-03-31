import React, { useState, useEffect, useCallback } from "react";

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "waiting": return "#ffc107";
    case "in-progress": return "#0d6efd";
    case "completed": return "#198754";
    case "cancelled": return "#dc3545";
    default: return "#6c757d";
  }
};

const TokenGeneration = () => {
  const [token, setToken] = useState(null);
  const [liveQueue, setLiveQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("General Physician");

  // Memoized fetch to use in useEffect and handlers
  const fetchQueue = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/queues/");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setLiveQueue(data);
      setLoading(false);
    } catch (error) {
      console.error("Queue fetch error:", error);
      setLoading(false);
    }
  }, []);

  const checkBackend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/health/");
      const data = await response.json();
      setBackendMessage(data.message || "Server Online");
    } catch (err) {
      setBackendMessage("Backend Offline");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("activeToken");
    if (savedToken) setToken(JSON.parse(savedToken));

    checkBackend();
    fetchQueue();

    const interval = setInterval(fetchQueue, 10000); // Faster refresh (10s)
    return () => clearInterval(interval);
  }, [fetchQueue]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = {
      patient_name: fullName,
      department: department,
      status: "Waiting",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/queues/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Find how many people are already waiting in that department
        const pos = liveQueue.filter(p => p.status.toLowerCase() === "waiting").length + 1;

        const newToken = {
          number: data.queue_number,
          position: pos,
          estWait: `${pos * 10} min`, // Simple logic: 10 mins per person
          department: data.department
        };

        setToken(newToken);
        localStorage.setItem("activeToken", JSON.stringify(newToken));
        setFullName(""); // Clear input
        await fetchQueue();
      } else {
        alert("Failed to generate token. Please check backend migrations.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Is the Django server running?");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Do you want to clear your current token?")) {
      setToken(null);
      localStorage.removeItem("activeToken");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column pt-5 mt-4 theme-transition bg-{isDarkMode== 'dark' ? 'light' : 'dark'}" >
      <main className="container py-5 flex-grow-1 ">
        
        {backendMessage && (
          <div className={`alert ${backendMessage.includes('Offline') ? 'alert-danger' : 'alert-info'} py-2 small shadow-sm rounded-pill mb-4 d-inline-block px-4`}>
            <span className="me-2">●</span>{backendMessage}
          </div>
        )}

        <div className="row g-5">
          <div className="col-lg-7">
            {!token ? (
              <div className="card shadow-lg border-0 p-5 h-100 rounded-4 bg-white">
                <h2 className="fw-bold mb-1">Book Your Visit</h2>
                <p className="text-muted mb-4">Secure your spot in the queue instantly.</p>

                <form onSubmit={handleGenerate}>
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-uppercase text-muted">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg bg-light border-0 rounded-3"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={processing}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-uppercase text-muted">Select Department</label>
                    <select
                      className="form-select form-select-lg bg-light border-0 rounded-3"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      disabled={processing}
                    >
                      <option>General Physician</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm py-3 mt-2 fw-bold"
                    disabled={processing}
                  >
                    {processing ? "Generating..." : "Generate Token"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="card bg-primary text-white border-0 shadow-lg p-5 text-center h-100 d-flex flex-column justify-content-center rounded-4 scale-in-center">
                <div className="mb-3">
                  <div className="badge bg-white text-primary rounded-pill px-3 py-2 text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                    Token Secured
                  </div>
                </div>
                <p className="opacity-75 mb-0 fs-5">Your Queue Number</p>
                <h1 className="display-1 fw-bold my-2">#{token.number}</h1>

                <div className="row mt-4 pt-4 border-top border-white border-opacity-25">
                  <div className="col border-end border-white border-opacity-25 text-center">
                    <small className="d-block opacity-75">Position</small>
                    <span className="h4 fw-bold">{token.position}</span>
                  </div>
                  <div className="col text-center">
                    <small className="d-block opacity-75">Est. Wait</small>
                    <span className="h4 fw-bold">{token.estWait}</span>
                  </div>
                </div>

                <button onClick={handleReset} className="btn btn-outline-light rounded-pill mt-5 px-4">
                  New Booking
                </button>
              </div>
            )}
          </div>

          <div className="col-lg-5">
            <div className="card shadow-lg border-0 h-100 rounded-4 bg-dark text-white overflow-hidden">
              <div className="card-header border-0 pt-4 px-4 d-flex justify-content-between align-items-center bg-transparent">
                <h5 className="fw-bold mb-0">Live Status</h5>
                <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-3">Live</span>
              </div>

              <div className="card-body p-4">
                <div className="queue-container" style={{ maxHeight: "450px", overflowY: "auto" }}>
                  {loading ? (
                    <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                  ) : liveQueue.length > 0 ? (
                    liveQueue.map((item, index) => (
                      <div key={item.id || index} className="d-flex align-items-center justify-content-between p-3 mb-3 rounded-4 bg-white bg-opacity-5 border border-white border-opacity-10">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary bg-opacity-25 p-3 me-3 text-primary fw-bold" style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {item.queue_number.toString().slice(-2)}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">#{item.queue_number}</h6>
                            <small className="text-secondary">{item.department}</small>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="badge rounded-pill mb-1 d-block" style={{ backgroundColor: getStatusColor(item.status), fontSize: "0.65rem" }}>
                            {item.status?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <p className="text-secondary">No active patients in queue.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenGeneration;
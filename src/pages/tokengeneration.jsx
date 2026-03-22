import React, { useState } from 'react';

const TokenGeneration = () => {
  const [token, setToken] = useState(null);

  const liveQueue = [
    { id: "2164", status: "In Progress", type: "Emergency", color: "danger" },
    { id: "2165", status: "Waiting", type: "Normal", color: "primary" },
    { id: "107", status: "Called", type: "Standard", color: "success" },
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    setToken({ number: 2166, position: 3, estWait: "15 min" });
  };

  return (
    /* Removed bg-light, now uses CSS variable from body */
    <div className="min-vh-100 d-flex flex-column pt-5 mt-4 theme-transition">
      
      <main className="container py-5 flex-grow-1">
        <div className="row g-4">
          
          {/* LEFT COLUMN: The Form or The Result */}
          <div className="col-lg-7">
            {!token ? (
              <div className="card shadow-sm border-0 p-4 h-100 custom-card">
                <h2 className="fw-bold mb-4 ">Book Your Visit</h2>
                <form onSubmit={handleGenerate}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold theme-text-muted">FULL NAME</label>
                      <input type="text" className="form-control custom-input" placeholder="John Doe" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label small fw-bold theme-text-muted">PHONE</label>
                      <input type="tel" className="form-control custom-input" placeholder="+1..." required />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label small fw-bold theme-text-muted">DEPARTMENT</label>
                    <select className="form-select custom-input">
                      <option>General Physician</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill shadow-sm">
                    Generate Token
                  </button>
                </form>
              </div>
            ) : (
              <div className="card bg-primary text-white border-0 shadow-lg p-5 text-center h-100 d-flex flex-column justify-content-center">
                <p className="text-uppercase small opacity-75 mb-1">Your Token Number</p>
                <h1 className="display-1 fw-bold">{token.number}</h1>
                <div className="mt-4 pt-3 border-top border-white border-opacity-25">
                  <p className="mb-0">Position in Queue: <strong>{token.position}</strong></p>
                  <p>Estimated Wait: <strong>{token.estWait}</strong></p>
                </div>
                <button 
                  onClick={() => setToken(null)} 
                  className="btn btn-link text-white text-decoration-none mt-3"
                >
                  ← Generate another token
                </button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Live Queue Status Preview */}
          <div className="col-lg-5">
            <div className="card shadow-sm border-0 h-100 custom-card">
              <div className="card-header border-0 pt-4 px-4 d-flex justify-content-between align-items-center bg-transparent">
                <h5 className="fw-bold mb-0">Live Queue Preview</h5>
                <span className="badge bg-success-subtle text-success rounded-pill px-3">Live</span>
              </div>
              <div className="card-body p-4">
                {liveQueue.map((item, index) => (
                  <div key={index} className="d-flex align-items-center justify-content-between p-3 mb-2 rounded custom-list-item border-start border-4 border-primary">
                    <div>
                      <h6 className="mb-0 fw-bold theme-text">#{item.id}</h6>
                      <small className="theme-text-muted">{item.type}</small>
                    </div>
                    <div className="text-end">
                      <span className={`badge bg-${item.color} rounded-pill mb-1 d-block`}>{item.status}</span>
                      <small className="theme-text-muted" style={{fontSize: '10px'}}>Updated just now</small>
                    </div>
                  </div>
                ))}
                
                {/* The "Avg Wait" box now uses theme variables instead of bg-dark */}
                <div className="mt-4 p-3 custom-wait-box rounded shadow-sm">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="theme-text-muted d-block">Avg. Wait Time</small>
                      <span className="h5 fw-bold mb-0 ">14 min</span>
                    </div>
                    <i className="bi bi-clock-history fs-3 text-primary"></i>
                  </div>
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
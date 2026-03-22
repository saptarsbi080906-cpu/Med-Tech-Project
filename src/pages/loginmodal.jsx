import React, { useState } from "react";
import { createPortal } from "react-dom";

const LoginModal = ({ isOpen, onClose, setAuth, setAdmin }) => {
  const [activeTab, setActiveTab] = useState("patient"); // 'patient' or 'admin'
  const [isRegistering, setIsRegistering] = useState(false);

  if (!isOpen) return null;

  const handleToggleMode = () => setIsRegistering(!isRegistering);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (activeTab === "admin") {
      // Admin Login Logic
      setAuth(true);
      setAdmin(true);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("isAdmin", "true");
    } else {
      // Patient Login/Register Logic
      setAuth(true);
      setAdmin(false);
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("isAdmin", "false");
    }
    
    onClose();
  };

  return createPortal(
    <div className="login-overlay" onClick={onClose}>
      <div className="login-box shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="btn-close position-absolute top-0 end-0 m-3"></button>

        {/* Tab Switcher - Hidden during Registration */}
        {!isRegistering && (
          <div className="d-flex mb-4 bg-body-secondary rounded-pill p-1">
            <button 
              className={`btn w-50 rounded-pill py-2 transition-all ${activeTab === 'patient' ? 'btn-primary shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveTab('patient')}
            >
              <i className="bi bi-person-heart me-2"></i>Patient
            </button>
            <button 
              className={`btn w-50 rounded-pill py-2 transition-all ${activeTab === 'admin' ? 'btn-primary shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveTab('admin')}
            >
              <i className="bi bi-shield-lock me-2"></i>Admin
            </button>
          </div>
        )}

        <h3 className="fw-bold mb-1 theme-text text-center">
          {isRegistering ? "Create Account" : activeTab === "patient" ? "Patient Login" : "Hospital Admin"}
        </h3>
        <p className="text-muted small mb-4 text-center">
          {isRegistering ? "Join Medi Queue today." : "Welcome back to the portal."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            /* --- REGISTRATION FIELDS --- */
            <>
              <div className="mb-2">
                <label className="form-label small fw-bold theme-text">Full Name</label>
                <input type="text" className="form-control rounded-3 py-2 bg-body-secondary border-0" placeholder="John Doe" required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-bold theme-text">Email ID</label>
                <input type="email" className="form-control rounded-3 py-2 bg-body-secondary border-0" placeholder="example@mail.com" required />
              </div>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label small fw-bold theme-text">Phone</label>
                  <input type="tel" className="form-control rounded-3 py-2 bg-body-secondary border-0" placeholder="+91..." required />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold theme-text">Aadhar</label>
                  <input type="text" className="form-control rounded-3 py-2 bg-body-secondary border-0" placeholder="12 Digit" required />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold theme-text">Password</label>
                <input type="password" className="form-control rounded-3 py-2 bg-body-secondary border-0" placeholder="••••••••" required />
              </div>
            </>
          ) : (
            /* --- LOGIN FIELDS --- */
            <>
              <div className="mb-3">
                <label className="form-label small fw-bold theme-text">
                  {activeTab === "patient" ? "Aadhar Number / Email" : "Admin ID"}
                </label>
                <input type="text" className="form-control rounded-3 py-2 bg-body-secondary border-0" required />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold theme-text">Password</label>
                <input type="password" className="form-control rounded-3 py-2 bg-body-secondary border-0" required />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm">
            {isRegistering ? "Register Now" : activeTab === "patient" ? "Login to Portal" : "Access Dashboard"}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <span 
              className="text-primary fw-bold cursor-pointer" 
              onClick={handleToggleMode}
              style={{ textDecoration: 'underline' }}
            >
              {isRegistering ? "Sign In" : "Register Now"}
            </span>
          </small>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;
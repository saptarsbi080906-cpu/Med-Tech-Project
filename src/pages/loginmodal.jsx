import React, { useState } from "react";
import { createPortal } from "react-dom";

const LoginModal = ({ isOpen, onClose, setAuth, setAdmin }) => {
  const [activeTab, setActiveTab] = useState("patient"); 
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    aadhar: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isRegistering 
      ? "http://127.0.0.1:8000/api/register/" 
      : "http://127.0.0.1:8000/api/login/";

    const bodyData = isRegistering 
      ? {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          aadhar: formData.aadhar,
          password: formData.password,
        }
      : {
          username: formData.username,
          password: formData.password,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegistering) {
          alert("Registration Successful! Please login.");
          setIsRegistering(false);
        } else {
          // LOGIN SUCCESS
          // Backend sends is_admin, fallback to tab selection if missing
          const isAdminUser = data.is_admin ?? (activeTab === "admin");
          
          setAuth(true);
          setAdmin(isAdminUser);
          
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("isAdmin", isAdminUser.toString());
          localStorage.setItem("username", data.user || formData.username);
          
          onClose(); // This clears the "black screen" overlay
        }
      } else {
        setError(data.error || data.message || "Action failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Server connection failed. Is your Django server running?");
    }
  };

  return createPortal(
    <div className="login-overlay" onClick={onClose} style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 9999
    }}>
      <div className="login-box shadow-lg bg-white p-4 rounded-4" 
           onClick={(e) => e.stopPropagation()} 
           style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
        
        <button onClick={onClose} className="btn-close position-absolute top-0 end-0 m-3"></button>

        {!isRegistering && (
          <div className="d-flex mb-4 bg-light rounded-pill p-1">
            <button 
              className={`btn w-50 rounded-pill py-2 ${activeTab === 'patient' ? 'btn-primary shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveTab('patient')}
            >
              Patient
            </button>
            <button 
              className={`btn w-50 rounded-pill py-2 ${activeTab === 'admin' ? 'btn-primary shadow-sm' : 'text-muted'}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin
            </button>
          </div>
        )}

        <h3 className="fw-bold mb-3 text-center">
          {isRegistering ? "Create Account" : activeTab === "patient" ? "Patient Login" : "Hospital Admin"}
        </h3>
        
        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <>
              <input type="text" name="fullName" onChange={handleInputChange} className="form-control mb-2" placeholder="Full Name" required />
              <input type="email" name="email" onChange={handleInputChange} className="form-control mb-2" placeholder="Email ID" required />
              <div className="row g-2 mb-2">
                <div className="col-6"><input type="tel" name="phone" onChange={handleInputChange} className="form-control" placeholder="Phone" required /></div>
                <div className="col-6"><input type="text" name="aadhar" onChange={handleInputChange} className="form-control" placeholder="Aadhar" required /></div>
              </div>
              <input type="password" name="password" onChange={handleInputChange} className="form-control mb-4" placeholder="Password" required />
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label small fw-bold">{activeTab === "patient" ? "Aadhar / Email" : "Admin ID"}</label>
                <input type="text" name="username" onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold">Password</label>
                <input type="password" name="password" onChange={handleInputChange} className="form-control" required />
              </div>
            </>
          )}
          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">
            {isRegistering ? "Register Now" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            {isRegistering ? "Already have an account? " : "New user? "}
            <span className="text-primary fw-bold cursor-pointer" onClick={handleToggleMode} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {isRegistering ? "Sign In" : "Register Here"}
            </span>
          </small>
        </div>
      </div>
    </div>,
    document.body // Portals directly to body to avoid "modal-root" errors
  );
};

export default LoginModal;
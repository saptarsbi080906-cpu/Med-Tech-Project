import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import LoginModal from "./loginmodal.jsx"; 

// --- Sub-Components ---

const Hero = ({ isAuth, onGuardClick }) => (
  <header className="hero-section py-2 border-bottom">
    <div className="container px-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center my-5">
          <h1 className="display-4 fw-bolder mb-4">
            Innovating Healthcare <br />
            <span className="text-primary text-gradient">Through Technology</span>
          </h1>
          <p className="lead text-muted mb-5">
            Empowering medical professionals with smart tools and real-time data
            to improve patient outcomes worldwide.
          </p>
          <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
            {isAuth ? (
              <>
                <Link to="/book-appointment" className="btn btn-primary btn-lg px-4 me-sm-3 rounded-pill shadow-sm">
                  Book Appointment
                </Link>
                <Link to="/queue-status" className="btn btn-outline-secondary btn-lg px-4 rounded-pill">
                  View Queue Status
                </Link>
              </>
            ) : (
              <>
                <button onClick={(e) => onGuardClick(e)} className="btn btn-primary btn-lg px-4 me-sm-3 rounded-pill shadow-sm">
                  Login to Book
                </button>
                <button onClick={(e) => onGuardClick(e)} className="btn btn-outline-secondary btn-lg px-4 rounded-pill">
                  Login to View Status
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);

const RunningLine = () => {
  const items = [
    { icon: "bi-activity", text: "Real-Time Queue Updates" },
    { icon: "bi-shield-check", text: "Smart Queue Management" },
    { icon: "bi-exclamation-circle", text: "Priority Handling" },
    { icon: "bi-truck", text: "Ambulance Records" },
    { icon: "bi-laptop", text: "Staff Dashboard" }
  ];

  return (
    <div className="ticker-wrapper py-1 shadow-sm">
      <div className="ticker-content">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="ticker-item mx-4 fw-medium">
            <i className={`bi ${item.icon} me-2`}></i> {item.text}
          </span>
        ))}
      </div>
    </div>
  );
};

const Features = ({ isAuth, onGuardClick }) => {
  const navigate = useNavigate();

  const features = [
    { title: "Real-Time Updates", desc: "Track your queue position and estimated wait time.", icon: "bi-activity", path: "/queue-status" },
    { title: "Smart Queue Management", desc: "End-to-end encryption for patient records.", icon: "bi-shield-check", path: "#" },
    { title: "Priority Handling", desc: "Advanced triage algorithms for urgent cases.", icon: "bi-exclamation-circle", path: "#" },
    { title: "Ambulance Records", desc: "Comprehensive tracking and emergency arrivals.", icon: "bi-truck", path: "/ambulance-records" },
    { title: "Staff Dashboard", desc: "Admin tools for managing appointments.", icon: "bi-laptop", path: "/admin-dashboard" },
  ];

  const handleFeatureClick = (path) => {
    if (path === "#") return;
    if (!isAuth) {
      onGuardClick();
    } else {
      navigate(path);
    }
  };

  return (
    <section className="py-5" id="services">
      <div className="container px-5 my-5">
        <div className="row g-4 justify-content-center">
          {features.map((f, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <div 
                className="card h-100 shadow-sm p-4 feature-card border-0"
                onClick={() => handleFeatureClick(f.path)}
                style={{ cursor: f.path !== "#" ? "pointer" : "default" }}
              >
                <div className="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3 d-inline-flex align-items-center justify-content-center" style={{width: "50px", height: "50px"}}>
                  <i className={`bi ${f.icon}`}></i>
                </div>
                <h2 className="h4 fw-bolder">{f.title}</h2>
                <p className="text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = ({ isAuth, onGuardClick }) => {
  const steps = [
    { num: "1", title: "Generate Token", desc: "Receive your digital queue token upon arrival." },
    { num: "2", title: "Track Status", desc: "Monitor your position in real-time." },
    { num: "3", title: "Get Notified", desc: "Receive alerts when your turn approaches." },
  ];

  return (
    <section className="experience-section py-5">
      <div className="container px-5 my-5">
        <div className="row align-items-center">
          <div className="col-lg-5 mb-5">
            <h2 className="display-5 fw-bold mb-4">Seamless <br /><span className="text-primary">Experience</span></h2>
            {!isAuth ? (
              <button onClick={(e) => onGuardClick(e)} className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold">
                Login to Start <i className="bi bi-chevron-right ms-2"></i>
              </button>
            ) : (
              <Link to="/book-appointment" className="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold">
                Start Your Journey <i className="bi bi-chevron-right ms-2"></i>
              </Link>
            )}
          </div>
          <div className="col-lg-6 offset-lg-1">
            {steps.map((step, i) => (
              <div key={i} className="d-flex mb-5 position-relative">
                <div className="me-4 text-center">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow" style={{width: "50px", height: "50px", fontWeight: "bold"}}>
                    {step.num}
                  </div>
                </div>
                <div>
                  <span className="text-primary text-uppercase small fw-bold">Step 0{step.num}</span>
                  <h3 className="h4 fw-bold mt-1 ">{step.title}</h3>
                  <p className="text-muted mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Home Component ---
export default function Home({ isAuth, isAdmin, setAuth, setAdmin, showLogin, setShowLogin }) {

  // Logic to handle clicks on protected features
  const handleProtectedClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowLogin(true); // Open the modal instead of just alert
  };

  return (
    <>
      {/* Note: Navbar should be in App.jsx to avoid duplication. 
          LoginModal is triggered here via showLogin state.
                */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        setAuth={setAuth}
        setAdmin={setAdmin} 
      />

      <div className={`d-flex flex-column min-vh-100 ${showLogin ? 'content-blur' : ''}`}>
        <main className="mt-5">
          <Hero isAuth={isAuth} onGuardClick={handleProtectedClick} />
          <RunningLine />
          <Features isAuth={isAuth} onGuardClick={handleProtectedClick} />
          <Experience isAuth={isAuth} onGuardClick={handleProtectedClick} />
        </main>
      </div>
    </>
  );
}
import React from "react";
// 1. REMOVED: import Navbar from "./navbar.jsx"; (App.jsx handles this now)
import Footer from "./footer.jsx"; // You can keep Footer here or let App.jsx handle it

const Appointment = () => {
  // Styles (Keeping your existing styles)
  const formCardStyle = {
    backgroundColor: "#111111",
    padding: "60px",
    borderRadius: "0",
    color: "white",
  };

  const inputStyle = {
    backgroundColor: "white",
    border: "none",
    borderRadius: "4px",
    padding: "12px 15px",
    marginBottom: "20px",
    width: "100%",
    color: "#333",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  const submitButtonStyle = {
    backgroundColor: "#6366f1",
    color: "white",
    border: "none",
    padding: "15px",
    borderRadius: "4px",
    width: "100%",
    fontWeight: "bold",
    marginTop: "10px",
  };

  const infoIconStyle = {
    width: "45px",
    height: "45px",
    backgroundColor: "#6366f1",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    fontSize: "1.2rem",
    flexShrink: 0,
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 2. REMOVED: <Navbar /> (If left here, you get a second, broken Navbar) */}

      <main className="flex-grow-1" style={{ marginTop: "70px" }}> {/* Added margin to clear the fixed Navbar */}
        <section className="appointment-section py-5 bg-white">
          <div className="container-fluid p-0">
            <div className="row g-0 align-items-stretch">
              <div className="col-lg-6 px-5 py-5 d-flex flex-column justify-content-center">
                <div className="max-width-500 mx-auto">
                  <h1
                    className="display-4 fw-bold mb-4 "
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Book Your Appointment
                  </h1>
                  <p className="lead text-muted mb-5">
                    Schedule your visit with our healthcare professionals. Fill
                    out the form and we'll confirm your appointment within 24
                    hours.
                  </p>

                  <div className="d-flex mb-4">
                    <div style={infoIconStyle} className="me-4">
                      <i className="bi bi-calendar3"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold h5 mb-1">Flexible Scheduling</h4>
                      <p className="text-muted small">
                        Choose your preferred date and time. We'll work with you
                        to find the best slot.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex mb-4">
                    <div style={infoIconStyle} className="me-4">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold h5 mb-1">Quick Confirmation</h4>
                      <p className="text-muted small">
                        Receive confirmation via email or phone within one
                        business day.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex">
                    <div style={infoIconStyle} className="me-4">
                      <i className="bi bi-person-badge"></i>
                    </div>
                    <div>
                      <h4 className="fw-bold h5 mb-1">Priority Service</h4>
                      <p className="text-muted small">
                        Pre-booked appointments receive priority queue placement
                        on arrival.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div style={formCardStyle} className="h-100">
                  <h2
                    className="h3 fw-bold mb-5"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    Request Form
                  </h2>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      style={inputStyle}
                      required
                    />

                    <label style={labelStyle}>Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="(555) 123-4567"
                      style={inputStyle}
                      required
                    />

                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      style={inputStyle}
                      required
                    />

                    <div className="row">
                      <div className="col-md-6">
                        <label style={labelStyle}>Preferred Date *</label>
                        <input type="date" style={inputStyle} required />
                      </div>
                      <div className="col-md-6">
                        <label style={labelStyle}>Preferred Time *</label>
                        <input type="time" style={inputStyle} required />
                      </div>
                    </div>

                    <label style={labelStyle}>Reason for Visit *</label>
                    <textarea
                      placeholder="Briefly describe your symptoms or reason for visit"
                      style={{ ...inputStyle, height: "120px", resize: "none" }}
                      required
                    ></textarea>

                    <button type="submit" style={submitButtonStyle}>
                      Submit Appointment Request
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 3. OPTIONAL: If App.jsx already has <Footer />, remove this one too! */}
    </div>
  );
};

export default Appointment;
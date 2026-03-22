import React from "react";

const Footer = () => (
  <footer className="bg-black text-white py-5 mt-auto">
    <div className="container">
      <div className="row gy-4">
        <div className="col-lg-3 col-md-6">
          <h1 className="fw-bold h3">Medi Queue</h1>
          <p className="text-secondary mt-3">
            Revolutionizing clinical workflows through smart technology and
            real-time patient data.
          </p>
        </div>
        <div className="col-lg-3 col-md-6">
          <h2 className="h5 fw-bold mb-3">Contact Us</h2>
          <p className="text-secondary mb-2">
            <i className="bi bi-telephone me-2"></i> +1 233-6789
          </p>
          <p className="text-secondary mb-2">
            <i className="bi bi-envelope me-2"></i> abc@mail.com
          </p>
          <p className="text-secondary">
            <i className="bi bi-geo-alt me-2"></i> 123 Health Ave, Med City
          </p>
        </div>
        <div className="col-lg-3 col-md-6">
          <h2 className="h5 fw-bold mb-3">Quick Links</h2>
          <div className="d-flex flex-column">
            <a href="#" className="text-secondary text-decoration-none mb-2">
              Home
            </a>
            <a href="#" className="text-secondary text-decoration-none mb-2">
              Queue List
            </a>
            <a href="#" className="text-secondary text-decoration-none mb-2">
              Book Appointment
            </a>
            <a href="#" className="text-secondary text-decoration-none">
              Admin Dashboard
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h2 className="h5 fw-bold mb-3">Service Hours</h2>
          <p className="text-secondary mb-1">
            <i className="bi bi-clock me-2"></i> Morning: 7am - 4pm
          </p>
          <p className="text-secondary mb-1 ms-4">Evening: 6pm - 12pm</p>
          <p className="text-secondary ms-4">Emergency: 24 x 7</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

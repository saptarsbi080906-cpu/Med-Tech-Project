import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ isAuth, isAdmin, onGuardClick, setShowLogin, setAuth, setAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // --- DARK MODE LOGIC ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.body;
    if (isDarkMode) {
      root.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.setAttribute("data-bs-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = (e) => {
    e.stopPropagation();
    setIsDarkMode(!isDarkMode);
  };

  const isActiveManual = (path) =>
    location.pathname === path ? "text-primary fw-bold" : "text-muted";

  const handleLoginClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowLogin(true);
    }, 800);
  };

  const handleLogout = () => {
    // Clear States
    setAuth(false);
    setAdmin(false);
    // Clear Storage
    localStorage.setItem("isAuth", "false");
    localStorage.setItem("isAdmin", "false");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm fixed-top bg-body-tertiary"
      style={{ zIndex: 2000 }}
    >
      <div className="container px-5">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-plus-circle-fill me-2"></i>Medi Queue
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            
            {/* HOME */}
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-bold" : ""}`}
                to="/"
              >
                Home
              </NavLink>
            </li>

            {/* APPOINTMENT */}
            <li className="nav-item">
              {isAuth ? (
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-bold" : ""}`}
                  to="/book-appointment"
                >
                  Appointment
                </NavLink>
              ) : (
                <button
                  type="button"
                  className={`nav-link btn btn-link border-0 shadow-none ${isActiveManual("/book-appointment")}`}
                  onClick={onGuardClick}
                >
                  Appointment
                </button>
              )}
            </li>

            {/* QUEUE */}
            <li className="nav-item">
              {isAuth ? (
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-bold" : ""}`}
                  to="/queue-status"
                >
                  Queue
                </NavLink>
              ) : (
                <button
                  type="button"
                  className={`nav-link btn btn-link border-0 shadow-none ${isActiveManual("/queue-status")}`}
                  onClick={onGuardClick}
                >
                  Queue
                </button>
              )}
            </li>

            {/* AMBULANCE */}
            <li className="nav-item">
              {isAuth ? (
                <NavLink
                  className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-bold" : "fw-semibold"}`}
                  to="/ambulance-records"
                >
                  Ambulance
                </NavLink>
              ) : (
                <button
                  className="nav-link btn btn-link fw-semibold border-0"
                  onClick={onGuardClick}
                  style={{ background: "none", cursor: "pointer" }}
                >
                  Ambulance
                </button>
              )}
            </li>

            {/* --- ADMIN ONLY SECTION --- */}
            {isAuth && isAdmin && (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-bold" : "fw-semibold"}`}
                    to="/admin-dashboard"
                  >
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => `nav-link ${isActive ? "text-primary fw-bold" : "fw-semibold"}`}
                    to="/route-tracker"
                  >
                    <i className="bi bi-map me-1"></i> Route Tracker
                  </NavLink>
                </li>
              </>
            )}

            {/* --- USER / LOGIN SECTION --- */}
            <li className="nav-item ms-lg-3">
              {isAuth ? (
                <div className="dropdown">
                  <div
                    className="d-flex align-items-center bg-body-secondary rounded-pill p-1 pe-2 shadow-sm border dropdown-toggle"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <i className="bi bi-person-fill"></i>
                    </div>
                    <small className="fw-bold me-1">
                      {isAdmin ? "Admin" : "Account"}
                    </small>
                  </div>

                  <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item py-2" to="/profile">
                        <i className="bi bi-person me-2"></i>My Profile
                      </Link>
                    </li>

                    {/* Dark Mode Switch */}
                    <li>
                      <div
                        className="dropdown-item py-2 d-flex align-items-center justify-content-between"
                        onClick={toggleDarkMode}
                        style={{ cursor: "pointer" }}
                      >
                        <div>
                          <i className={`bi ${isDarkMode ? "bi-moon-stars-fill text-info" : "bi-sun-fill text-warning"} me-2`}></i>
                          {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </div>
                        <div className="form-check form-switch ms-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={isDarkMode}
                            readOnly
                          />
                        </div>
                      </div>
                    </li>

                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item py-2 text-danger fw-bold" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button
                  className="btn btn-primary rounded-pill px-4 d-flex align-items-center"
                  onClick={handleLoginClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Loading...</>
                  ) : (
                    "Log In"
                  )}
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
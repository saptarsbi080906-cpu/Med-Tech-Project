import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components & Pages
import Navbar from "./pages/navbar.jsx";
import Footer from "./pages/footer.jsx";
import Home from "./pages/home.jsx";
import Appointment from "./pages/appointment.jsx";
import TokenGeneration from "./pages/tokengeneration.jsx";
import AmbulanceRecords from "./pages/ambulancerecords.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"; 
import RouteTracker from "./pages/RouteTracker.jsx";

// Styles
import "./App.css";
import "./pages/home.css";
import "./index.css";

function App() {
  // --- AUTH & ROLE STATE ---
  // Initialize from localStorage to persist login across refreshes
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem("isAuth") === "true");
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showLogin, setShowLogin] = useState(false);
  
  // --- DARK MODE STATE ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // 1. Sync Theme with Bootstrap 5.3+ attribute
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDarkMode]);

  // 2. Sync Auth and Admin status with LocalStorage
  useEffect(() => {
    localStorage.setItem("isAuth", isAuth);
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAuth, isAdmin]);

  // Handler for non-logged-in users trying to access features
  const handleProtectedClick = (e) => {
    if (e) e.preventDefault();
    setShowLogin(true);
  };

  return (
    <>
      <Navbar 
        isAuth={isAuth} 
        isAdmin={isAdmin} 
        setAuth={setIsAuth} 
        setAdmin={setIsAdmin} 
        setShowLogin={setShowLogin} 
        onGuardClick={handleProtectedClick}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/" element={
          <Home 
            isAuth={isAuth} 
            isAdmin={isAdmin}
            setAuth={setIsAuth} 
            setAdmin={setIsAdmin}
            showLogin={showLogin} 
            setShowLogin={setShowLogin} 
            onGuardClick={handleProtectedClick} 
          />
        } />

        {/* PATIENT PROTECTED ROUTES */}
        <Route 
          path="/book-appointment" 
          element={isAuth ? <Appointment /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/queue-status" 
          element={isAuth ? <TokenGeneration /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/ambulance-records" 
          element={isAuth ? <AmbulanceRecords /> : <Navigate to="/" replace />} 
        />

        {/* ADMIN PROTECTED ROUTES */}
        <Route 
          path="/admin-dashboard" 
          element={isAuth && isAdmin ? <AdminDashboard /> : <Navigate to="/" replace />} 
        />
        <Route 
          path="/route-tracker" 
          element={isAuth && isAdmin ? <RouteTracker /> : <Navigate to="/" replace />} 
        />

        {/* FALLBACK (Redirects any unknown URL to Home) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
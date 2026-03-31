import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components & Pages
import Navbar from "./pages/navbar.jsx";
import Footer from "./pages/footer.jsx";
import Home from "./pages/home.jsx";
import Appointment from "./pages/appointment.jsx";
import TokenGeneration from "./pages/tokengeneration.jsx";
import AmbulanceRecords from "./pages/AmbulanceRecords.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx"; 
import RouteTracker from "./pages/RouteTracker.jsx";

// Styles
import "./App.css";
import "./pages/home.css";
import "./index.css";

function App() {
  // --- AUTH & ROLE STATE ---
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem("isAuth") === "true");
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showLogin, setShowLogin] = useState(false);
  
  // --- BACKEND MESSAGE STATE ---
  const [backendMessage, setBackendMessage] = useState(""); 

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

  // 3. Fetch Backend Data
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/data/')
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => {
        setBackendMessage(data.message); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handler for protected features
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

      {/* Backend Status Bar */}
      {backendMessage && (
        <div className="alert alert-info text-center mb-0 py-1 small rounded-0 border-0 shadow-sm">
          <strong>System:</strong> {backendMessage}
        </div>
      )}

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

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
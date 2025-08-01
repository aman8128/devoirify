import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";           // Protected Page (Order Form)
import OrderHistory from "./pages/OrderHistory";     // Order History for user
import AssignmentListingPage from "./pages/AssignmentListingPage"; // Assignment Listings
import { LoginPage, SignupPage } from "./components/login"; // Auth pages
import PrivateRoute from "./components/PrivateRoute";  
import Navigation from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation/>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/browse-assignments" element={<AssignmentListingPage />} />
            {/* Use PrivateRoute to secure OrderPage and OrderHistory */}
            <Route 
              path="/order" 
              element={<PrivateRoute><OrderPage /></PrivateRoute>} 
            />
            <Route 
              path="/history" 
              element={<PrivateRoute><OrderHistory /></PrivateRoute>} 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

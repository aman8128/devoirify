import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  // Get user & token from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    // Clear localStorage on logout
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand text-white fw-bold">
          {user?.role === "writer" ? "Assignment Writers Hub" : "Assignment Service"}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link custom-nav-link">Home</Link>
            </li>

            {isAuthenticated ? (
              <>
                {user?.role === "student" ? (
                  <>
                    <li className="nav-item">
                      <Link to="/place-order" className="nav-link custom-nav-link">Place Order</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/my-orders" className="nav-link custom-nav-link">Order History</Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link to="/available-orders" className="nav-link custom-nav-link">My Orders</Link>
                  </li>
                )}

                <li className="nav-item">
                  <button
                    className="nav-link btn custom-nav-link"
                    onClick={handleLogout}
                    style={{ border: "none", background: "none" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link custom-nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link custom-nav-link">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
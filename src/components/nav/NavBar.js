import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear localStorage upon logout
    localStorage.removeItem("userEmployeeId");

    // Clear the token and navigate to the login page
    setToken("");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-default navbar-fixed-top navbar-shrink" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="brand-logo text-white">TechTasker</h1>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          {token ? (
            <>
              <div className="navbar-item">
                <Link to="/work_orders">Work Orders</Link>
              </div>
              <div className="navbar-item">
                <Link to="/my_profile">My Profile</Link>
              </div>
              <div className="navbar-item">
                <Link to="/employees">Employees</Link>
              </div>
              <div className="navbar-item">
                <Link to="/login" onClick={handleLogout} className="nav-bar-t">Logout</Link>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

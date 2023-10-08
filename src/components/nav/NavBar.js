import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const navCollapseRef = useRef(null);

    const handleLogout = () => {
        // Clear localStorage upon logout
        localStorage.removeItem("userEmployeeId");

        // Clear the token and navigate to the login page
        setToken("");
        navigate("/login");
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
          if (navCollapseRef.current && !navCollapseRef.current.contains(e.target)) {
            // If the click occurred outside the navbar collapse, close it
            navCollapseRef.current.classList.remove('show');
          }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
          // Clean up the event listener when the component unmounts
          document.removeEventListener('click', handleOutsideClick);
        };
      }, []);
    


    return (
    <div className="navbar-container"> 
        <nav className="navbar nav-expand-lg bg-info fixed-top shadow nav">
          <div className="container m-3">
            <div className="navbar-start">
            <button
              className="navbar-toggler bg-light border-info"
              type="button"
              data-toggle="collapse"
              data-target="#navNav"
              aria-controls="navNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/work_orders" className="navbar-brand text-light m-3">
              TechTasker
            </Link>
            </div>
            <div
              className="collapse navbar-collapse" id="navNav" ref={navCollapseRef}
            >
              <ul className="navbar-nav">
                {token ? (
                  <>
                    <li className="nav-item mt-3">
                      <Link to="/work_orders" className="nav-link text-light">
                        Work Orders
                      </Link>
                    </li>
                    <li className="nav-item mt-3">
                      <Link to="/my_profile/:profileId" className="nav-link text-light">
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item mt-3">
                      <Link to="/employees" className="nav-link text-light">
                        Employees
                      </Link>
                    </li>
                    <li className="nav-item mt-3">
                      <Link to="/login" onClick={handleLogout} className="nav-link text-light">
                        Logout
                      </Link>
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
        </div>
      );

};

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const $ = window.$;

  useEffect(() => {
    // Load Bootstrap styles and scripts
    const bootstrapCSS = document.createElement("link");
    bootstrapCSS.href =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
    bootstrapCSS.rel = "stylesheet";
    document.head.appendChild(bootstrapCSS);

    const bootstrapJS = document.createElement("script");
    bootstrapJS.src =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js";
    bootstrapJS.async = true;
    bootstrapJS.defer = true;
    document.body.appendChild(bootstrapJS);

    bootstrapJS.onload = () => {
      // Initialize Bootstrap components here
      $('[data-spy="scroll"]').scrollspy();

      // Your JavaScript code that should run on component mount
      $(function () {
        $('a.page-scroll').bind('click', function (event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
          }, 1500, 'easeInOutExpo');
          event.preventDefault();
        });
      });

      // Highlight the top nav as scrolling occurs
      $('body').scrollspy({
        target: '.navbar-fixed-top'
      });

      // Closes the Responsive Menu on Menu Item Click
      $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
      });
    };
  }, []); // Empty dependency array to run this effect only once after mounting

  const handleLogout = () => {
    // Clear localStorage upon logout
    localStorage.removeItem("userEmployeeId");

    // Clear the token and navigate to the login page
    setToken("");
    navigate("/login");
  };

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="brand-logo">TechTasker</h1>
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

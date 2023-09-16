import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/work_orders">
                    <img height="3rem" alt="Rare Logo" /> <h1 className="title is-4">TechTasker</h1>
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token
                            ? (
                                <>
                                    <Link to="/work_orders" className="navbar-item">Work Orders
                                    </Link>
                                    <Link to="/my_profile" className="navbar-item">
                                        My Profile
                                    </Link>
                                    <Link to="/employees" className="navbar-item">Employees
                                    </Link>

                                </>

                            )
                            : ""
                    }
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                token
                                    ?
                                    <button className="button is-outlined" onClick={() => {
                                        // Clear localStorage upon logout
                                        localStorage.removeItem("userEmployeeId");
                                        localStorage.removeItem("is_supervisor");

                                        // Clear the token and navigate to the login page
                                        setToken('')
                                        navigate('/login')
                                    }}>Logout
                                    </button>
                                    :
                                    <>
                                        <Link to="/register" className="button is-link">Register</Link>
                                        <Link to="/login" className="button is-outlined">Login</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

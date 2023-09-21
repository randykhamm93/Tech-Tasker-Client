import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"

export const Login = ({ setToken }) => {
  const email = useRef()
  const password = useRef()
  const passwordDialog = useRef();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    loginUser(user)
      .then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);

          // Capture and store the userEmployeeId in localStorage
          const userEmployeeId = res.userEmployeeId;
          localStorage.setItem("userEmployeeId", userEmployeeId);

          // Navigate to the desired route
          navigate("/work_orders");
        } else {
          // Display an error message or open the passwordDialog
          setIsUnsuccessful(true);
          passwordDialog.current.showModal(); // Open the dialog
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
      <div className="container bg-light" style={{ maxWidth: '800px', maxHeight: '800px' }}>
        <section className="row justify-content-center">
          <form className="col-12 col-md-10" onSubmit={handleLogin}>
            <h1 className="text-dark text-center justify-content-center mb-5 mt-2 ">Welcome To TechTasker</h1>
            <h4 className="text-dark subtitle mb-4">Please sign in</h4>
            <div className="mb-3">
              <label htmlFor="email" className="text-dark form-label">Email</label>
              <input className="form-control" type="text" id="email" ref={email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-dark form-label">Password</label>
              <input className="form-control" type="password" id="password" ref={password} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary mb-3" type="submit">Submit</button>
              <Link to="/register" className="btn btn-link mb-3">Register</Link>
            </div>
            {isUnsuccessful ? <p className="text-danger">Email or password not valid</p> : ''}
          </form>
        </section>
      </div>
    </div>
  );



}

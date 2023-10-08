import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./login.css"

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
    <div className="position-absolute top-50 start-50 translate-middle
    d-flex align-items-center justify-content-center">
      <div className="container border bg-light shadow" style={{ width: '800px', maxHeight: '500px' }}>
        <section className="row justify-content-center">
          <form className="col-md-8" onSubmit={handleLogin}>
            <h1 className="text-center justify-content-center mb-5 mt-5">Welcome To TechTasker</h1>
            <h4 className=" subtitle mb-4">Please sign in</h4>
            <div className="mb-3">
              <label htmlFor="email" className=" form-label">Email</label>
              <input className="form-control" type="text" id="email" ref={email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className=" form-label">Password</label>
              <input className="form-control" type="password" id="password" ref={password} />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary mt-3 mb-3" type="submit">Submit</button>
              <Link to="/register" className="btn btn-link mt-3 mb-3">Register</Link>
            </div>
            {isUnsuccessful ? <p className="text-danger">Email or password not valid</p> : ''}
          </form>
        </section>
      </div>
    </div>
  );



}

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
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleLogin}>
        <h1 className="title">Welcome To TechTasker...</h1>
        <p className="subtitle">Please sign in</p>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="text" ref={email} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className="input" type="password" ref={password} />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="btn-primary" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/register" className="button is-link is-light">Register</Link>
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help is-danger">Email or password not valid</p> : ''
        }
      </form>
    </section>
  )
}

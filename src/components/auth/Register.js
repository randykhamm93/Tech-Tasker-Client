import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import "./Auth.css";

export const Register = () => {
  const email = useRef()
  const phoneNumber = useRef()
  const firstName = useRef();
  const lastName = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const start_date = useRef();
  const role = useRef();
  const specialty = useRef();
  const hourlyWage = useRef();
  const shift = useRef();
  const accountType = useRef();
  const passwordDialog = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        email: email.current.value,
        phone_number: phoneNumber.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        password: password.current.value,
        start_date: start_date.current.value,
        role: role.current.value,
        specialty: specialty.current.value,
        hourly_wage: hourlyWage.current.value,
        shift: parseInt(shift.current.value),
        account_type: accountType.current.value,
      };

      registerUser(newUser)
        .then((res) => {
          if ("token" in res) {
            localStorage.setItem("auth_token", res.token);
            navigate("/");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button className="button--close" onClick={(e) => passwordDialog.current.close()}>Close</button>
      </dialog>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input ref={email} type="email" name="email" className="form-control" placeholder="Email" required autoFocus />
        </fieldset>
        <fieldset>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input ref={phoneNumber} type="tel" name="phoneNumber" className="form-control" placeholder="Phone number" required />
        </fieldset>
        <fieldset>
          <label htmlFor="firstName">First Name</label>
          <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName">Last Name</label>
          <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword">Verify Password</label>
          <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
        </fieldset>
        <fieldset>
          <label htmlFor="start_date">Start Date</label>
          <input ref={start_date} type="date" name="start_date" className="form-control" required />
        </fieldset>
        <fieldset>
          <label htmlFor="role">Role</label>
          <input ref={role} type="text" name="role" className="form-control" placeholder="Role" required />
        </fieldset>
        <fieldset>
          <label htmlFor="specialty">Specialty</label>
          <input ref={specialty} type="text" name="specialty" className="form-control" placeholder="Specialty" required />
        </fieldset>
        <fieldset>
          <label htmlFor="hourlyWage">Hourly Wage</label>
          <input ref={hourlyWage} type="number" name="hourlyWage" className="form-control" placeholder="Hourly Wage" required />
        </fieldset>
        <fieldset>
          <label htmlFor="shift">Shift</label>
          <input ref={shift} type="text" name="shift" className="form-control" placeholder="Shift" required />
        </fieldset>
        <fieldset>
          <label htmlFor="accountType">Account Type</label>
          <select ref={accountType} name="accountType" className="form-control" required>
            <option value="employee">Employee</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </fieldset>
        <fieldset style={{ textAlign: "center" }}>
          <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
        </fieldset>
      </form>
      <section className="link--register">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  );
};

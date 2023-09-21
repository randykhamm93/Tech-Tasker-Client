import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";

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
        shift: (shift.current.value),
        account_type: accountType.current.value,
      };

      registerUser(newUser)
        .then((res) => {
          if ("token" in res) {
            localStorage.setItem("auth_token", res.token);
            navigate("/login");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
  <main className="container mb-5 bg-white">
    <dialog className="dialog dialog--password" ref={passwordDialog}>
      <div>Passwords do not match</div>
      <button className="btn btn-secondary button--close" onClick={(e) => passwordDialog.current.close()}>Close</button>
    </dialog>
    <form className="form--login" onSubmit={handleRegister}>
      <h1 className="h1 mt-3 font-weight-normal text-dark text-center">Register an account</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input ref={email} type="email" name="email" className="form-control mb-3" id="email" placeholder="Email" required autoFocus />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input ref={phoneNumber} type="tel" name="phoneNumber" className="form-control mb-3" id="phoneNumber" placeholder="Phone number" required />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input ref={firstName} type="text" name="firstName" className="form-control mb-3" id="firstName" placeholder="First name" required />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input ref={lastName} type="text" name="lastName" className="form-control mb-3" id="lastName" placeholder="Last name" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input ref={password} type="password" name="password" className="form-control mb-3" id="password" placeholder="Password" required />
      </div>
      <div className="form-group">
        <label htmlFor="verifyPassword">Verify Password</label>
        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control mb-3" id="verifyPassword" placeholder="Verify password" required />
      </div>
        <fieldset>
          <label htmlFor="start_date">Start Date</label>
          <input ref={start_date} type="date" name="start_date" className="form-control mb-3" required />
        </fieldset>
        <fieldset>
          <label htmlFor="role">Job Title</label>
          <select ref={role} name="role" className="form-control mb-3" required>
            <option value="Apprentice">Apprentice</option>
            <option value="Maintenance Tech I">Maintenance Tech I</option>
            <option value="Maintenance Tech II">Maintenance Tech II</option>
            <option value="Maintenance Tech III">Maintenance Tech III</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="specialty">Specialty</label>
          <input ref={specialty} type="text" name="specialty" className="form-control mb-3" placeholder="Specialty" required />
        </fieldset>
        <fieldset>
          <label htmlFor="hourlyWage">Hourly Wage</label>
          <input ref={hourlyWage} type="number" name="hourlyWage" className="form-control mb-3" placeholder="Hourly Wage" required />
        </fieldset>
        <fieldset>
          <label htmlFor="shift">Shift</label>
          <select ref={shift} name="shift" className="form-control mb-3" required>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="accountType">Account Type</label>
          <select ref={accountType} name="accountType" className="form-control" required>
            <option value="employee">Employee</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </fieldset>
        <div className="form-group" style={{ textAlign: "left" }}>
        <button className="btn btn-primary btn-1 btn-sep icon-send mt-4" type="submit">Register</button>
      </div>
    </form>
    <section className="link--register" style={{ textAlign: "left" }}> 
      Already registered? <Link to="/login">Login</Link>
    </section>
  </main>
);
};

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editEmployee, getEmployee } from "../../managers/EmployeeManager";

export const EditMyProfile = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [myProfile, setMyProfile] = useState({});
  const [role, setRole] = useState({})
  const [shift, setShift] = useState([]);
  const [hourlyWage, setHourlyWage] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const [email, setEmail] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState({});


  useEffect(() => {

    if (employeeId) {
      getEmployee(employeeId)
        .then((myData) => {
          setMyProfile(myData);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [employeeId]);

  const handleEditProfile = async (event) => {
    event.preventDefault();

    try {
      // Create an object with the updated data
      const updatedEmployeeData = {
        email: myProfile.email,
        phoneNumber: myProfile.phone_number,
        role: role, // Use the state variable directly
        specialty: specialty,
        hourlyWage: hourlyWage,
        shift: shift,
        // Add other fields as needed
      };

      // Make an API request to update the employee's profile
      // Replace 'updateEmployee' with your actual API function
      await editEmployee(employeeId, updatedEmployeeData);

      // After successful update, navigate back to the profile page
      navigate(`/my_profile/${employeeId}`);
    } catch (error) {
      console.error("Error updating employee profile:", error);
      // Handle errors or display an error message to the user
    }
  };


  return (
    <div className="container mb-5 bg-light" style={{ width: '800px' }}>
      <form className="form--login text-dark m-3" onSubmit={handleEditProfile}>
        <h1 className="h1 mt-3 font-weight-normal text-dark text-center pt-3">Edit Profile</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={myProfile.email || ''}
            onChange={(e) => setMyProfile({ ...myProfile, email: e.target.value })}
            className="form-control mb-3"
            id="email"
            placeholder="Email"
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={myProfile.phone_number || ''}
            onChange={(e) => setMyProfile({ ...myProfile, phone_number: e.target.value })}
            className="form-control mb-3"
            id="phoneNumber"
            placeholder="Phone number"
            required
          />
        </div>
        <fieldset>
          <label htmlFor="role">Job Title</label>
          <select
            name="role"
            value={role} // Use the state variable directly
            onChange={(e) => setRole(e.target.value)} // Update the state variable on change
            className="form-control mb-3"
            required
          >
            <option value="">Select Job Title</option>
            <option value="Apprentice">Apprentice</option>
            <option value="Maintenance Tech I">Maintenance Tech I</option>
            <option value="Maintenance Tech II">Maintenance Tech II</option>
            <option value="Maintenance Tech III">Maintenance Tech III</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </fieldset>
          <label htmlFor="specialty">Specialty</label>
          <input
            type="text"
            name="specialty"
            value={specialty} // Use the state variable directly
            onChange={(e) => setSpecialty(e.target.value)} // Update the state variable on change
            className="form-control mb-3"
            placeholder="Specialty"
            required
          />
          <fieldset>
            <label htmlFor="hourlyWage">Hourly Wage</label>
            <input
              type="number"
              name="hourlyWage"
              value={hourlyWage} // Use the state variable directly
              onChange={(e) => setHourlyWage(e.target.value)} // Update the state variable on change
              className="form-control mb-3"
              placeholder="Hourly Wage"
              required
            />
          </fieldset>
          <fieldset>
            <label htmlFor="shift">Shift</label>
            <select
              name="shift"
              value={shift} // Use the state variable directly
              onChange={(e) => setShift(e.target.value)} // Update the state variable on change
              className="form-control mb-3"
              required
            >
              <option value="">Select Shift</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
            </select>
          </fieldset>

          <div className="form-group" style={{ textAlign: "center" }}>
            <button className="btn btn-primary btn-1 btn-sep icon-send mt-4 mb-4" type="submit">Save Profile</button>
          </div>

      </form>
    </div>
  );

};

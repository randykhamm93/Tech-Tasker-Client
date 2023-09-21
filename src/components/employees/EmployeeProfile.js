import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEmployee, getEmployee } from "../../managers/EmployeeManager";

export const EmployeeProfile = () => {
  const [employee, setEmployee] = useState({});
  const [isSupervisor, setIsSupervisor] = useState(false);
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userEmployeeId = localStorage.getItem("userEmployeeId");

    getEmployee(employeeId)
      .then((employeeData) => {
        setEmployee(employeeData);

        // Check if the logged-in employee is a supervisor
        if (userEmployeeId) {
          getEmployee(userEmployeeId)
            .then((userEmployeeData) => {
              setIsSupervisor(userEmployeeData.is_supervisor);
            })
            .catch((error) => {
              console.error("Error fetching employee data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [employeeId]);

  const handleDelete = () => {
    const userConfirmed = window.confirm('Are you sure you want to delete this employee?');
    if (userConfirmed) {
      deleteEmployee(employee.id)
        .then(() => {
          navigate('/employees');
        })
        .catch((error) => {
          console.error('Error deleting employee', error);
        });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
        <section className="work-order p-5 bg-white shadow-lg rounded-lg col-md-4">
          <h1 className="text-xl-center font-semibold mb-5">{employee.full_name}</h1>
          <div className="text-center mb-4"> {/* Center-align text within the div */}
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Specialty:</strong> {employee.specialty}</p>
            <p><strong>Shift:</strong> {employee.shift}</p>
            <p><strong>Phone Number:</strong> {employee.phone_number}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Start Date:</strong> {employee.start_date}</p>
          </div>
          {isSupervisor && (
            <div className="text-center"> {/* Center-align the button */}
              <button onClick={handleDelete} className="btn btn-danger">Delete Employee</button>
            </div>
          )}
        </section>
      </div>
    </>
  );

};

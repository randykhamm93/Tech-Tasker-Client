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

  const editEmployee = () => {
    navigate(`/employees/edit/${employee.id}`);
  };

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
      <section className="work-order p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold mb-2">{employee.full_name}</h1>
        <div className="flex justify-between mb-4">
          <div className="text-sm text-gray-600">
            <p>Role: {employee.role}</p>
            <p>Specialty: {employee.specialty}</p>
            <p>Shift: {employee.shift}</p>
            <p>Phone Number: {employee.phone_number}</p>
            <p>Email: {employee.email}</p>
            <p>Start Date: {employee.start_date}</p>
          </div>
        </div>
        {isSupervisor && (
          <div>
            <div>
              <button onClick={editEmployee} className="btn-primary">Edit Employee</button>
            </div>
            <div>
              <button onClick={handleDelete} className="btn-danger">Delete Employee</button>
            </div>
          </div>
        )}
      </section>
      
    </>
  );
};

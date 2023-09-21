import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../../managers/EmployeeManager";


export const EmployeeList = (token) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employeesData) => setEmployees(employeesData));
  }, []);

  return (
    <div className="container d-flex align-items-center" style={{ minHeight: '75vh' }}>
  <div className="d-flex flex-wrap justify-content-center">
    {employees.map((employee) => (
      <div key={employee.id} className="card m-2" style={{ width: '18rem' }}>
        <Link to={`/employees/${employee.id}`} className="text-decoration-none">
          <div className="card-body text-center">
            <h5 className="card-title">{employee.full_name}</h5>
            <p className="card-text">{employee.role}</p>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
);
};

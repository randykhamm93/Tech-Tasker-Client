import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../../managers/EmployeeManager";


export const EmployeeList = (token) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employeesData) => setEmployees(employeesData));
  }, []);

  return (
    <div className="container position-absolute top-50 start-50 translate-middle bg-light mt-3">
      <h1 className="text-center pt-5 text-dark">Employees</h1>
      <div className="d-flex align-items-center m-4">
        <div className="d-flex flex-wrap justify-content-center mb-3">
          {employees.map((employee) => (
            <div key={employee.id} className="card m-3 bg-secondary" style={{ width: '20rem' }}>
              <Link to={`/employees/${employee.id}`} className="text-decoration-none">
                <div className="card-body text-center border border-secondary border border-info">
                  <h5 className="card-title text-light">{employee.full_name}</h5>
                  <p className="card-text text-light">{employee.role}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
};

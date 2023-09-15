import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEmployees } from "../../managers/EmployeeManager";


export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((employeesData) => setEmployees(employeesData));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-header">Employees</h1>
      <div className="work_order-container">
        <div className="left-side">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <Link to={`/employees/${employee.id}`}>
                      {employee.full_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {employee.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

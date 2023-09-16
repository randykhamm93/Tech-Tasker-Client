import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteEmployee, getEmployee } from "../../managers/EmployeeManager";

export const EmployeeProfile = ({ token, isSupervisor }) => {
  const [employee, setEmployee] = useState({});
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const assignedToUsers = employee?.assigned_to || [];
  const createdByUser = employee?.created_by_user || {};

  useEffect(() => {
    getEmployee(employeeId)
      .then((employeeData) => {
        setEmployee(employeeData);
      })
  }, [employeeId]);

  const editEmployee = () => {
    navigate(`/work_orders/edit/${employee.id}`);
  };

  const handleDelete = () => {
    const userConfirmed = window.confirm('Are you sure you want to delete this work order?');
    if (userConfirmed) {
      deleteEmployee(employee.id)
        .then(() => {
          navigate('/work_orders');
        })
        .catch((error) => {
          console.error('Error deleting work order', error);
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
            <p>Hourly Wage: {employee.hourly_wage}</p>
            <p>Shift: {employee.shift}</p>
            <p>Phone Number: {employee.phone_number}</p>
            <p>Email: {employee.email}</p>
            <p>Start Date: {employee.start_date}</p>
          </div>
        </div>
      </section>
      <section>
          <div>
            <button onClick={editEmployee}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
      </section>
    </>
  );
};

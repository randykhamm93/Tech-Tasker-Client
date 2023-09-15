import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../managers/CategoryManager';
import { createWorkOrder } from '../../managers/WorkOrderManager';
import { getAllDepartments } from '../../managers/DepartmentManager';
import { getAllEmployees } from '../../managers/EmployeeManager';

export const CreateWorkOrderForm = () => {
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState({
    title: '',
    department: 0,
    category: 0,
    due_date: '',
    assigned_to: [],
    critical: false,
    status: 'Not Started',
    description: '',
  });
  const [employees, setEmployees] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [critical, setCritical] = useState(false);
  const [status, setStatus] = useState('Not Started');
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  const STATUS_CHOICES = [
    { value: 'Not Started', label: 'Not Started' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  useEffect(() => {
    getAllEmployees().then((employeesData) => {
      setEmployees(employeesData);
    });

    getAllDepartments().then((departmentsData) => {
      setDepartments(departmentsData);
    });

    getAllCategories().then((categoriesData) => {
      setCategories(categoriesData);
    });
  }, []);

  const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const newWorkOrder = {
    title: workOrder.title,
    assigned_to: selectedEmployees,
    department: selectedDepartment,
    category: selectedCategory,
    critical: critical,
    status: status,
    due_date: dueDate,
    description: workOrder.description,
  };

  createWorkOrder(newWorkOrder)
  .then((response) => response.json()) // Parse the response body as JSON
  .then((createdWorkOrder) => {
    // Check if the response contains the 'id' field
    if (createdWorkOrder && createdWorkOrder.id) {
      // Redirect to the details page of the newly created work order
      navigate(`/work_orders/${createdWorkOrder.id}`);
    } else {
      console.error('Error creating work order: Invalid response');
    }
  })
  .catch((error) => {
    console.error('Error creating work order:', error);
  });
};

  return (
    <form className="workOrderForm">
      <h2 className="workOrderForm__title">Create New Work Order</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required autoFocus
            className="form-control"
            value={workOrder.title}
            onChange={(evt) => {
              setWorkOrder({ ...workOrder, title: evt.target.value });
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="department">Department: </label>
          <select
            name="department"
            required autoFocus
            className="form-control"
            value={selectedDepartment}
            onChange={(evt) => {
              setSelectedDepartment(evt.target.value);
            }}
          >
            {Array.isArray(departments) && departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            required autoFocus
            className="form-control"
            value={selectedCategory}
            onChange={(evt) => {
              setSelectedCategory(evt.target.value);
            }}
          >
            {Array.isArray(categories) && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="due_date">Due Date: </label>
          <input
            type="date"
            name="due_date"
            required
            className="form-control"
            value={dueDate}
            onChange={(evt) => {
              setDueDate(evt.target.value);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor="assigned_to">Assigned To:</label>
        <select
          name="assigned_to"
          required
          multiple
          className="form-control"
          value={selectedEmployees}
          onChange={(evt) => {
            const selectedOptions = Array.from(evt.target.selectedOptions, (option) =>
              option.value
            );
            setSelectedEmployees(selectedOptions);
          }}
        >
          {Array.isArray(employees) &&
            employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
        </select>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="critical">Emergency:</label>
          <input
            type="checkbox"
            name="critical"
            className="form-check-input"
            checked={critical}
            onChange={(evt) => {
              setCritical(evt.target.checked);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Status:</label>
          {STATUS_CHOICES.map((statusOption) => (
            <div key={statusOption.value}>
              <input
                type="radio"
                name="status"
                value={statusOption.value}
                checked={status === statusOption.value}
                onChange={(evt) => {
                  setStatus(evt.target.value);
                }}
              />
              {statusOption.label}
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            required
            className="form-control"
            value={workOrder.description}
            onChange={(evt) => {
              setWorkOrder({ ...workOrder, description: evt.target.value });
            }}
          />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={handleFormSubmit} 
      >Save</button>
    </form>
  );
};

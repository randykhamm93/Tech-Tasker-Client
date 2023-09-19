import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCategories } from '../../managers/CategoryManager'
import { getWorkOrder, editWorkOrder } from '../../managers/WorkOrderManager'
import { getAllDepartments } from '../../managers/DepartmentManager';
import { getAllEmployees } from '../../managers/EmployeeManager';

export const EditWorkOrderForm = () => {
  const navigate = useNavigate();
  const { workOrderId } = useParams();
  const [workOrder, setWorkOrder] = useState({});
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
    getAllEmployees()
      .then((employeesData) => {
        setEmployees(employeesData);
      });

    getWorkOrder(workOrderId)
      .then((data) => {
        setWorkOrder(data);
        setStatus(data.status);
        setDueDate(data.due_date)
        setSelectedDepartment(data.department.id);
        setSelectedCategory(data.category.id);
        setCritical(data.critical)
        setSelectedEmployees(data.assigned_to.map((employee) => employee.id))
      });

    getAllDepartments()
      .then((departmentsData) => {
        setDepartments(departmentsData);
      });

    getAllCategories()
      .then((categoriesData) => {
        setCategories(categoriesData);
      });
  }, [workOrderId]);

  return (
    <form className="workOrderForm">
      <h2 className="workOrderForm__title">Edit Work Order</h2>
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
            className="ml-2"
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
        onClick={evt => {
          evt.preventDefault();

          const work_order = {
            title: workOrder.title,
            assigned_to: selectedEmployees,
            department: selectedDepartment,
            category: selectedCategory,
            critical: critical,
            status: status,
            due_date: dueDate,
            description: workOrder.description
          };

          editWorkOrder(workOrderId, work_order)
            .then(() => navigate(`/work_orders/${workOrderId}`));
        }}className='btn-success'
      >Save Work Order</button>
    </form>
  );
};

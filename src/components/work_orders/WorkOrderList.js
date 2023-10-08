import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllWorkOrders } from "../../managers/WorkOrderManager";
import { getEmployee } from "../../managers/EmployeeManager";
import { useNavigate } from "react-router-dom";


export const WorkOrderList = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkOrders().then((workOrderData) => setWorkOrders(workOrderData));

    const userEmployeeId = localStorage.getItem("userEmployeeId");
    if (userEmployeeId) {
      getEmployee(userEmployeeId)
        .then((employeeData) => {
          setIsSupervisor(employeeData.is_supervisor);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, []);

  const navigateToCreateWorkOrder = () => {
    navigate("/work_orders/create");
  };

  const navigateToMyWorkOrders = () => {
    navigate("/work_orders/my_work_orders");
  };

  const getButtonClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'btn btn-danger';
      case 'In Progress':
        return 'btn btn-primary';
      case 'Completed':
        return 'btn btn-success';
      default:
        return 'btn btn-secondary';
    }
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle container d-flex align-items-center justify-content-center" >
      <div className="list-group" style={{ width: '1200px' }}>
          <h1 className="page-header text-dark text-center mt-5 mb-5">All Work Orders</h1>
          <table className="table table-striped table-bordered shadow text-center">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder) => (
                <tr key={workOrder.id}>
                  <td>
                    <Link to={`/work_orders/${workOrder.id}`} className="text-decoration-none text-primary">
                      {workOrder.title}
                    </Link>
                  </td>
                  <td>{workOrder.due_date}</td>
                  <td>
                    <span className={`btn btn-sm ${getButtonClass(workOrder.status)}`}>
                      {workOrder.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            {isSupervisor ? (
              <button className="btn btn-primary m-5" onClick={navigateToCreateWorkOrder}>
                Create New Work Order
              </button>
            ) : (
              <button className="btn btn-primary m-5" onClick={navigateToMyWorkOrders}>
                My Work Orders
              </button>
            )}
          </div>
        </div>
      </div>
  );
  
};

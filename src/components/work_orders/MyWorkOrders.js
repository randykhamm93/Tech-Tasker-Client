import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEmployeeWorkOrders } from "../../managers/WorkOrderManager";

export const MyWorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    getEmployeeWorkOrders()
      .then((workOrdersData) => {
        setWorkOrders(workOrdersData);
      })
      .catch((error) => {
        console.error("Error fetching work orders:", error);
      });
  }, []);

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
    <div className="container position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
      <div className="list-group">
        <div className="bg-light container">
          <h1 className="page-header text-dark text-center mt-3 mb-3" style={{width: '1000px'}}>My Work Orders</h1>
          <table className="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder) => (
                <tr key={workOrder.work_order.id}>
                  <td>
                    <Link to={`/work_orders/${workOrder.work_order.id}`} className="text-decoration-none text-primary">
                      {workOrder.work_order.title}
                    </Link>
                  </td>
                  <td>{workOrder.work_order.due_date}</td>
                  <td>
                    <span className={`btn btn-sm ${getButtonClass(workOrder.work_order.status)}`}>
                      {workOrder.work_order.status}
                    </span>
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

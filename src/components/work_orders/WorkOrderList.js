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

  const getBadgeClass = (status) => {
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
  <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
    <div className="list-group">
      <div className="bg-white container-xl">
      <h1 className="page-header text-dark text-center mt-3">All Work Orders</h1>
        {workOrders.map((workOrder) => (
          <div key={workOrder.id} className="mb-3 p-3">
            <Link to={`/work_orders/${workOrder.id}`} className="text-decoration-none">
              <div className="list-group-item d-flex justify-content-between align-items-center m-2">
                <div className=" align-items-center text-primary">{workOrder.title}</div>
                <div className="d-flex flex-row align-items-end">
                  <span className={`btn-sm m-2 ${getBadgeClass(workOrder.status)}`}>{workOrder.status}</span>
                  <span className="btn btn-sm btn-secondary m-2">{workOrder.due_date}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {isSupervisor ? (
          <button className="btn btn-success m-3"  onClick={navigateToCreateWorkOrder}>
            Create New Work Order
          </button>
        ) : (
          <button className="btn btn-primary m-3" onClick={navigateToMyWorkOrders}>
            My Work Orders
          </button>
        )}
      </div>
    </div>
  </div>
);

  
  
  
  
  
  
};

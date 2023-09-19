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

  return (
    <div className="page-container">
      <h1 className="page-header">Work Orders</h1>
      <div className="work_order-container">
        <div className="left-side">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workOrders.map((workOrder) => (
                <tr key={workOrder.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <Link to={`/work_orders/${workOrder.id}`}>
                      {workOrder.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {workOrder.due_date}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {workOrder.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isSupervisor ? (
            <button className="btn-success" onClick={navigateToCreateWorkOrder}>
            Create New Work Order
          </button>
          ) : (
            <button className="btn-success" onClick={navigateToMyWorkOrders}>
              My Work Orders
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

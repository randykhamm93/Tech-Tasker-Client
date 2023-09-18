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

  return (
    <div className="page-container">
      <h1 className="page-header">My Work Orders</h1>
      <div className="work_order-container">
        <div className="left-side">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workOrders.map((workOrder) => (
                <tr key={workOrder.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <Link to={`/work_orders/${workOrder.work_order.id}`}>
                      {workOrder.work_order.title}
                    </Link>
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

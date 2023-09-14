import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllWorkOrders } from "../../managers/WorkOrderManager";

export const WorkOrderList = () => {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    getAllWorkOrders().then((workOrderData) => setWorkOrders(workOrderData));
  }, []);

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
                </tr>
              ))}
            </tbody>
          </table>
          <button className="create-button">
            <Link to="/work_orders/create">Create New Work Order</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

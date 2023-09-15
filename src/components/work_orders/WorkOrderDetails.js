import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkOrder, deleteWorkOrder, editWorkOrderStatus } from '../../managers/WorkOrderManager';


export const WorkOrderDetails = ({ token, isSupervisor }) => {
  const [workOrder, setWorkOrder] = useState({});
  const { workOrderId } = useParams();
  const navigate = useNavigate();

  const assignedToUsers = workOrder?.assigned_to || [];
  const createdByUser = workOrder?.created_by_user || {};

  useEffect(() => {
    getWorkOrder(workOrderId)
      .then((workOrderData) => {
        setWorkOrder(workOrderData);
      })
  }, [workOrderId]);

  const editWorkOrder = () => {
    navigate(`/work_orders/edit/${workOrder.id}`);
  };

  const handleMarkInProgress = () => {
    if (window.confirm('Are you sure you want to mark this work order as In Progress?')) {
      editWorkOrderStatus(workOrder.id, 'In Progress')
        .then((response) => {
          if (response.ok) {
            getWorkOrder(workOrderId)
              .then((workOrderData) => {
                setWorkOrder(workOrderData);
              });
          } else {
            console.error('Error updating work order status');
          }
        })
        .catch((error) => {
          console.error('Error updating work order status:', error);
        });
    }
  };
  
  const handleMarkCompleted = () => {
    if (window.confirm('Are you sure you want to mark this work order as Completed?')) {
      editWorkOrderStatus(workOrder.id, 'Completed')
        .then((response) => {
          if (response.ok) {
            getWorkOrder(workOrderId)
              .then((workOrderData) => {
                setWorkOrder(workOrderData);
              });
          } else {
            console.error('Error updating work order status');
          }
        })
        .catch((error) => {
          console.error('Error updating work order status:', error);
        });
    }
  };
  
  const handleDelete = () => {
    // Implement a confirmation dialog or modal for deletion
    const userConfirmed = window.confirm('Are you sure you want to delete this work order?');
    if (userConfirmed) {
      // Send a request to your backend API to delete the work order
      deleteWorkOrder(workOrder.id)
        .then(() => {
          // Redirect or perform any necessary actions after deletion
          navigate('/work_orders');
        })
        .catch((error) => {
          console.error('Error deleting work order', error);
          // Handle the error as needed
        });
    }
  };

  return (
    <>
      <section className="work-order p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Work Order #{workOrder.id}</h1>
        <h2 className="text-xl font-semibold mb-2">{workOrder.title}</h2>
        <div className="flex justify-between mb-4">
          <div className="text-sm text-gray-600">
            <p>Emergency: {workOrder.critical ? 'Yes' : 'No'}</p>
            <p>Status: {workOrder.status}</p>
            <p>Due Date: {workOrder.due_date}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Category: {workOrder?.category?.name}</p>
            <p>Department: {workOrder?.department?.name}</p>
            <p>Assigned To:</p>
            <ul>
              {assignedToUsers.map((assignedUser, index) => (
                <li key={`${assignedUser.id}-${index}`}>{assignedUser.full_name}</li>
              ))}
            </ul>

            <p>Created By: {createdByUser?.first_name} {createdByUser?.last_name}</p>
            <p className="text-gray-700 mb-2">{workOrder.description}</p>
          </div>
        </div>
      </section>
      <section>
        {isSupervisor ? (
          <div>
            <button onClick={editWorkOrder}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <div>
            <button onClick={handleMarkInProgress}>Mark In Progress</button>
            <button onClick={handleMarkCompleted}>Mark Completed</button>
          </div>
        )}
      </section>
    </>
  );
};

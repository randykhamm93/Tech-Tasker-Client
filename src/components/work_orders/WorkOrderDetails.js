import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkOrder, editWorkOrder, deleteWorkOrder } from '../../managers/WorkOrderManager';

export const WorkOrderDetails = ({ token, isSupervisor }) => {
  const [workOrder, setWorkOrder] = useState({});
  const [workOrderStatus, updateWorkOrderStatus] = useState('');
  const { workOrderId } = useParams(); // Rename the parameter to avoid conflicts
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isSupervisor:', isSupervisor); // Debugging
    // ...
  }, [isSupervisor]);
  

  useEffect(() => {
    getWorkOrder(workOrderId)
      .then((workOrderData) => {
        setWorkOrder(workOrderData);
        updateWorkOrderStatus(workOrderData.status);
      })
  }, [workOrderId]);


  useEffect(() => {
    console.log('isSupervisor:', isSupervisor); // Debugging
    // ...
  }, [workOrderId]);

  const assignedToUsers = workOrder?.assigned_to || [];
  const createdByUser = workOrder?.created_by_user || {};

  const editWorkOrder = () => {
    // Implement the logic to edit the work order here
    // You can navigate to an edit page or show a modal for editing
    // For example, you can use navigate to navigate to an edit page
    navigate(`/edit-work-order/${workOrder.id}`);
  };

  const confirmDelete = () => {
    // Implement a confirmation dialog or modal for deletion
    const userConfirmed = window.confirm('Are you sure you want to delete this work order?');
    if (userConfirmed) {
      // Send a request to your backend API to delete the work order
      deleteWorkOrder(workOrder.id)
        .then(() => {
          // Redirect or perform any necessary actions after deletion
          navigate('/work-orders');
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
            <p>Critical: {workOrder.critical ? 'Yes' : 'No'}</p>
            <p>Status: {workOrder.status}</p>
            <p>Due Date: {workOrder.due_date}</p>
            <p>Created By: {createdByUser?.first_name} {createdByUser?.last_name}</p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Category: {workOrder?.category?.name}</p>
            <p>Department: {workOrder?.department?.name}</p>
            <p>Assigned To:</p>
            <ul>
              {assignedToUsers.map((assignedUser) => (
                <li key={assignedUser.id}>{assignedUser.full_name}</li>
              ))}
            </ul>
            <p className="text-gray-700 mb-2">{workOrder.description}</p>
          </div>
        </div>
      </section>
      <section>
        {isSupervisor ? (
          <div>
            <button onClick={editWorkOrder}>Edit</button>
            <button onClick={deleteWorkOrder}>Delete</button>
          </div>
        ) : (
          <div>
            <button>Mark Started</button>
            <button>Mark Completed</button>
          </div>
        )}

      </section>
    </>
  );
};

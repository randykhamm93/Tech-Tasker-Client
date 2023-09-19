import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getWorkOrder, deleteWorkOrder, editWorkOrderStatus } from '../../managers/WorkOrderManager';
import { getEmployee } from '../../managers/EmployeeManager';

export const WorkOrderDetails = () => {
  const [workOrder, setWorkOrder] = useState({});
  const [isSupervisor, setIsSupervisor] = useState(false);
  const assignedToUsers = workOrder?.assigned_to || [];
  const { workOrderId } = useParams();
  const createdByUser = workOrder?.created_by_user || {};
  const navigate = useNavigate();

  useEffect(() => {
    const userEmployeeId = localStorage.getItem("userEmployeeId");
    
    getWorkOrder(workOrderId)
      .then((workOrderData) => {
        setWorkOrder(workOrderData);
      });

    if (userEmployeeId) {
      getEmployee(userEmployeeId)
        .then((employeeData) => {
          setIsSupervisor(employeeData.is_supervisor); 
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
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
                console.log("Updated Work Order Data:", workOrderData); // Log the updated data
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
    const userConfirmed = window.confirm('Are you sure you want to delete this work order?');
    if (userConfirmed) {
      deleteWorkOrder(workOrder.id)
        .then(() => {
          navigate('/work_orders');
        })
        .catch((error) => {
          console.error('Error deleting work order', error);
        });
    }
  };

  return (
  <>
    <section className="work-order p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{workOrder.title}</h2>
      <div className="flex justify-between mb-4">
        <div className="text-sm text-gray-600">
          <p>Category: {workOrder?.category?.name}</p>
          <p>Department: {workOrder?.department?.name}</p>
          <p>Status: {workOrder.status}</p>
          <p>Created By: {createdByUser?.first_name} {createdByUser?.last_name}</p>
        </div>
          <p>Assigned To:</p>
          <ul>
            {assignedToUsers.map((assignedUser, index) => (
              <li key={`${assignedUser.id}-${index}`}>{assignedUser.full_name}</li>
            ))}
          </ul>
      </div>
      <div>
        <p className="text-sm text-gray-600">Description:</p>
        <p className="text-gray-700 mb-2">{workOrder.description}</p>
      </div>
      <div>
      {isSupervisor ? (
        <div>
          <button onClick={editWorkOrder} className='btn-primary'>Edit Work Order</button>
          <br></br>
          <button onClick={handleDelete}className='btn-danger'>Delete Work Order</button>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={handleMarkInProgress} className='btn-primary'>Mark In Progress</button>
          </div>  
          <div>
            <button onClick={handleMarkCompleted} className='btn-success'>Mark Completed</button>
          </div>
        </div>
      )}
      </div>
    </section>
    
  </>
  );
};

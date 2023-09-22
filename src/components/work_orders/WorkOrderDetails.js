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
      <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center" >
        <section className="work-order p-5 bg-light" style={{width: "800px"}}>
          <h1 className="text-xl-center font-semibold mb-5 text-center">{workOrder.title}</h1>
          <div className="mb-4">
            <p className="mb-4"><strong>Category:</strong> {workOrder?.category?.name}</p>
            <p className="mb-4"><strong>Department:</strong> {workOrder?.department?.name}</p>
            <p className="mb-4"><strong>Emergency:</strong> {workOrder.critical ? "Yes" : "No"}</p>
            <p className="mb-4"><strong>Status:</strong> {workOrder.status}</p>
            <p className="mb-4"><strong>Created By:</strong> {createdByUser?.first_name} {createdByUser?.last_name}</p>
          </div>
          <div className="mb-4">
            <p><strong>Assigned To:</strong></p>
            <ul>
              {assignedToUsers.map((assignedUser, index) => (
                <li key={`${assignedUser.id}-${index}`}>{assignedUser.full_name}</li>
              ))}
            </ul>
          </div>
          <div>
            <p><strong>Description:</strong></p>
            <p className="mb-2">{workOrder.description}</p>
          </div>
          <div className="d-flex justify-content-center">
            {isSupervisor ? (
              <div className="text-center">
                <div>
                  <button onClick={editWorkOrder} className='btn btn-primary mt-3 mb-3'>Edit Work Order</button>
                </div>
                <div>
                  <button onClick={handleDelete} className='btn btn-danger'>Delete Work Order</button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div>
                  <button onClick={handleMarkInProgress} className='btn btn-primary mt-3 mb-3'>Mark In Progress</button>
                </div>
                <div>
                  <button onClick={handleMarkCompleted} className='btn btn-success'>Mark Completed</button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

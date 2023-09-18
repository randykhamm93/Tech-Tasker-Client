export const getWorkOrder = (id) => {
  return fetch(`http://localhost:8000/work_orders/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const getAllWorkOrders = () => {
  return fetch("http://localhost:8000/work_orders", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const createWorkOrder = (newWorkOrder) => {
  return fetch("http://localhost:8000/work_orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(newWorkOrder),
  });
};

export const deleteWorkOrder = (id) => {
  return fetch(`http://localhost:8000/work_orders/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
}

export const editWorkOrder = (id, updatedData) => {
  return fetch(`http://localhost:8000/work_orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(updatedData),
  })
};

export const editWorkOrderStatus = (id, newStatus) => {
  return fetch(`http://localhost:8000/work_orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify({ status: newStatus }),
  });
};

export const getEmployeeWorkOrders = () => {
  return fetch("http://localhost:8000/employee_work_orders", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

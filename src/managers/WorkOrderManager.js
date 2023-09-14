export const getWorkOrder = (id, token) => {
  return fetch(`http://localhost:8000/work_orders/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const getAllWorkOrders = (token) => {
  return fetch("http://localhost:8000/work_orders", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const deleteWorkOrder = (id, token) => {
  return fetch(`http://localhost:8000/work_orders/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
}

export const editWorkOrder = (id, updatedData, token) => {
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

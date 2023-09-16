export const getEmployee = (id) => {
  return fetch(`http://localhost:8000/employees/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const getAllEmployees = () => {
  return fetch("http://localhost:8000/employees", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const editEmployee = (id, updatedData) => {
  return fetch(`http://localhost:8000/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(updatedData),
  })
};

export const deleteEmployee = (id) => {
  return fetch(`http://localhost:8000/employees/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
}

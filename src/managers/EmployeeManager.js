export const getEmployee = (id) => {
  return fetch(`http://localhost:8000/employees/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

export const getAllEmployees = (token) => {
  return fetch("http://localhost:8000/employees", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

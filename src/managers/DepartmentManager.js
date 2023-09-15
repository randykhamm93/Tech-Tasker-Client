export const getAllDepartments = () => {
  return fetch("http://localhost:8000/departments", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  }).then(response => response.json());
};

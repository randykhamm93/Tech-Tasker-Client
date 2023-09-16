import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployee } from "../../managers/EmployeeManager";

export const MyProfile = () => {
  const [myProfile, setMyProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userEmployeeId = localStorage.getItem("userEmployeeId");

    if (userEmployeeId) {
      getEmployee(userEmployeeId)
        .then((myData) => {
          setMyProfile(myData);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, []);

  const editEmployee = () => {
    navigate(`/work_orders/edit/${myProfile.id}`);
  };

  return (
    <>
      <section className="work-order p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold mb-2">{myProfile.full_name}</h1>
        <div className="flex justify-between mb-4">
          <div className="text-sm text-gray-600">
            <p>Role: {myProfile.role}</p>
            <p>Specialty: {myProfile.specialty}</p>
            <p>Hourly Wage: {myProfile.hourly_wage}</p>
            <p>Shift: {myProfile.shift}</p>
            <p>Phone Number: {myProfile.phone_number}</p>
            <p>Email: {myProfile.email}</p>
            <p>Start Date: {myProfile.start_date}</p>
          </div>
        </div>
      </section>
      <section>
        <div>
          <button onClick={editEmployee}>Edit</button>
        </div>
      </section>
    </>
  );
};

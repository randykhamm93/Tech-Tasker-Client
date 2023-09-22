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
    navigate(`/my_profile/edit/${myProfile.id}`);
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
        <section className="work-order p-5 bg-light" style={{width: "500px"}}>
          <h1 className="text-xl-center font-semibold mb-5">{myProfile.full_name}</h1>
          <div className="mb-4"> 
            <p><strong>Job Title:</strong> {myProfile.role}</p>
            <p><strong>Specialty:</strong> {myProfile.specialty}</p>
            <p><strong>Hourly Wage:</strong> {myProfile.hourly_wage}</p>
            <p><strong>Shift:</strong> {myProfile.shift}</p>
            <p><strong>Phone Number:</strong> {myProfile.phone_number}</p>
            <p><strong>Email:</strong> {myProfile.email}</p>
            <p><strong>Start Date:</strong> {myProfile.start_date}</p>
          </div>
          <div className="text-center">
            <button onClick={editEmployee} className="btn btn-primary mt-2">Edit Profile</button>
          </div>
        </section>
      </div>
    </>


  );
};

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
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '75vh' }}>
        <section className="work-order p-5 bg-white shadow-lg rounded-lg col-md-4">
          <h1 className="text-xl-center font-semibold mb-5">{myProfile.full_name}</h1>
          <div className="text-center mb-4"> {/* Center-align text within the div */}
            <p><strong>Role:</strong> {myProfile.role}</p>
            <p><strong>Specialty:</strong> {myProfile.specialty}</p>
            <p><strong>Hourly Wage:</strong> {myProfile.hourly_wage}</p>
            <p><strong>Shift:</strong> {myProfile.shift}</p>
            <p><strong>Phone Number:</strong> {myProfile.phone_number}</p>
            <p><strong>Email:</strong> {myProfile.email}</p>
            <p><strong>Start Date:</strong> {myProfile.start_date}</p>
          </div>
          <div className="text-center"> {/* Center-align the button */}
            <button onClick={editEmployee} className="btn btn-primary">Edit Profile</button>
          </div>
        </section>
      </div>
    </>


  );
};

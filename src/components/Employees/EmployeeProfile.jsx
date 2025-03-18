import { useEffect,useState } from "react";
import { getEmployeeById } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";


export const EmployeeProfile = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
  
    // Get the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("employee_user"));
  
    useEffect(() => {
      // If no user is logged in, send them to the login page
      if (!loggedInUser) {
        navigate("/login"); 
        return;
      }
  
      // Fetch the logged-in user's profile
      getEmployeeById(loggedInUser.id).then(setEmployee);
    }, [loggedInUser, navigate]);

    return (
      <div className="employee-profile">
        <h1>{employee.name}</h1>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Email:</strong>{employee.email}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Belt Rank:</strong> {employee.beltRank}</p>
        <p><strong>Pay Rate:</strong> ${employee.payRate} per shift</p>
         {/* Show Edit button only if the logged-in user is viewing their own profile */}
      {loggedInUser.id === employee.id && (
        <button 
        className="edit-profile-button" 
        onClick={() => navigate("/profile/edit")}
      >
        Edit Profile
      </button>
      
      )}
      </div>
    );
};

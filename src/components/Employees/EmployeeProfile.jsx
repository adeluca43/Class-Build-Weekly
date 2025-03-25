import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

export const EmployeeProfile = ({currentEmployee}) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);


  useEffect(() => {
    // If no employee is logged in, send them to the login page
    if (!currentEmployee || !currentEmployee.id) {
      navigate("/login");
      return;
    }

    // Fetch the logged-in employee's profile
    getEmployeeById(currentEmployee.id).then(setEmployee);
  }, [currentEmployee, navigate]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h1 className="card-title mb-4 text-success">{employee.name}</h1>
  
        <p className="mb-3 fs-5">
          <span className="fw-bold">Phone:</span> {employee.phone}
        </p>
        <p className="mb-3 fs-5">
          <span className="fw-bold">Email:</span> {employee.email}
        </p>
        <p className="mb-3 fs-5">
          <span className="fw-bold">Address:</span> {employee.address}
        </p>
        <p className="mb-3 fs-5">
          <span className="fw-bold">Belt Rank:</span> {employee.beltRank}
        </p>
        <p className="mb-4 fs-5">
          <span className="fw-bold">Pay Rate:</span> ${employee.payRate} per shift
        </p>
  
        {currentEmployee.id === employee.id && (
          <button
            className="btn fw-bold"
            style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
            onClick={() => navigate("/profile/edit")}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
  
      
}

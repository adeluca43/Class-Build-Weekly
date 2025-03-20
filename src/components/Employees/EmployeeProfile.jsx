import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

export const EmployeeProfile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  // Get the logged-in employee from localStorage
  const loggedInEmployee = JSON.parse(localStorage.getItem("employee_data"));

  useEffect(() => {
    // If no employee is logged in, send them to the login page
    if (!loggedInEmployee) {
      navigate("/login");
      return;
    }

    // Fetch the logged-in employee's profile
    getEmployeeById(loggedInEmployee.id).then(setEmployee);
  }, [loggedInEmployee, navigate]);

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>
        <strong>Phone:</strong> {employee.phone}
      </p>
      <p>
        <strong>Email:</strong>
        {employee.email}
      </p>
      <p>
        <strong>Address:</strong> {employee.address}
      </p>
      <p>
        <strong>Belt Rank:</strong> {employee.beltRank}
      </p>
      <p>
        <strong>Pay Rate:</strong> ${employee.payRate} per shift
      </p>

      {loggedInEmployee.id === employee.id && (
        <button onClick={() => navigate("/profile/edit")}>Edit Profile</button>
      )}
    </div>
  );
};

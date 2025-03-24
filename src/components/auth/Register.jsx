import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createEmployee,
  getEmployeeByEmail,
} from "../../services/employeeService";

export const Register = () => {
  const [employee, setEmployee] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  let navigate = useNavigate();

  const registerNewEmployee = () => {
    const newEmployee = {
      email: employee.email.toLowerCase(),
      name: employee.fullName,
      password: employee.password,
    };

    createEmployee(newEmployee).then((createdEmployee) => {
      if (createdEmployee?.id) {
        localStorage.setItem(
          "employee_data",
          JSON.stringify({
            id: createdEmployee.id,
            name: createdEmployee.name,
            email: createdEmployee.email,
          })
        );
        navigate("/");
      }
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    //Check for email or password missing
    if (!employee.email || !employee.password) {
      window.alert("Email and password are required!");
      return;
    }

    getEmployeeByEmail(employee.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists");
      } else {
        registerNewEmployee();
      }
    });
  };

  const updateEmployee = (event) => {
    const { id, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [id]: value,
    }));
  };

  return (
    <main className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="card shadow-sm p-4"
        onSubmit={handleRegister}
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="text-success text-center mb-2">Employee Class Tracker</h1>
        <h2 className="text-center mb-4">Please Register</h2>
  
        <fieldset className="mb-3 border-0">
          <input
            onChange={updateEmployee}
            type="text"
            id="fullName"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
  
        <fieldset className="mb-3 border-0">
          <input
            onChange={updateEmployee}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
  
        <fieldset className="mb-4 border-0">
          <input
            onChange={updateEmployee}
            type="password"
            id="password"
            className="form-control"
            placeholder="Create a password"
            required
          />
        </fieldset>
  
        <fieldset className="border-0">
          <button
            type="submit"
            className="btn fw-bold w-100"
            style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
          >
            Register
          </button>
        </fieldset>
      </form>
    </main>
  );
  
};

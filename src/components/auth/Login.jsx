import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeeByEmail } from "../../services/employeeService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents form from refreshing the page

    if (!email || !password) {
      window.alert("Please enter both email and password.");
      return;
    }

    // Fetch employee by email and validate login
    getEmployeeByEmail(email).then((foundEmployees) => {
      if (foundEmployees.length === 1) {
        const employee = foundEmployees[0];

        if (employee.password !== password) {
          window.alert("Invalid password");
          return;
        }

        // Ensure ID is stored correctly
        localStorage.setItem(
          "employee_data",
          JSON.stringify({
            id: employee.id,
            name: employee.name,
            address: employee.address || "",
            phone: employee.phone || "",
            email: employee.email,
            payRate: employee.payRate || "",
            beltRank: employee.beltRank || "",
          })
        );

        navigate("/profile");
      } else {
        window.alert("Invalid login credentials");
      }
    });
  };

  return (
    <main className="container d-flex justify-content-center align-items-center vh-100">
      <section className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-success text-center mb-4">Employee Class Tracker</h1>
  
          <fieldset className="mb-3 border-0">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
  
          <fieldset className="mb-4 border-0">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </fieldset>
  
          <fieldset className="border-0">
            <button
              type="submit"
              className="btn fw-bold w-100"
              style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
            >
              Sign In
            </button>
          </fieldset>
        </form>
  
        <div className="text-center mt-3">
          <Link to="/register" className="text-decoration-none fw-bold text-secondary">
            First time? Create your profile now!
          </Link>
        </div>
      </section>
    </main>
  );
  
};

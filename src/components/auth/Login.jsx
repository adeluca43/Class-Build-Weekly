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
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Employee Class Tracker</h1>
          <fieldset>
            <div>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">"First time? Create your profile now!"</Link>
      </section>
    </main>
  );
};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeeByEmail } from "../../services/employeeService";

export const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents form from refreshing the page

    // Validate that both email and password are entered
    if (!email || !password) {
      window.alert("Please enter both email and password.");
      return;
    }

    // Fetch user by email and validate login
    getEmployeeByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];

        // Verify the password
        if (user.password !== password) {
          window.alert("Invalid password");
          return;
        }

        // Ensure ID is stored correctly
        localStorage.setItem(
          "employee_user",
          JSON.stringify({
            id: user.id,  // Store ID properly
            name: user.name,
            address: user.address || "",
            phone: user.phone || "",
            email: user.email,
            payRate: user.payRate || "",
            beltRank: user.beltRank || "",
          })
        );

        navigate("/profile"); // Redirect to profile page after login
      } else {
        window.alert("Invalid login credentials");
      }
    }).catch(error => {
      console.error("Error during login:", error);
      window.alert("An error occurred during login. Please try again.");
    });
  };


  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1 className="header">Employee Class Tracker</h1>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => setEmail(evt.target.value)} 
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">"First time? Create your profile now!"</Link>
      </section>
    </main>
  );
};

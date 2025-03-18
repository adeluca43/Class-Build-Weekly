import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeeByEmail } from "../../services/employeeService";

export const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

// validate the password here
if (!password) {
   window.alert("Please enter your password");
     return;
   }


    getEmployeeByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];

 //  verify the password here
        if (user.password !== password) {
        window.alert("Invalid password");
         return;
        }




        // Store user details in localStorage
        localStorage.setItem(
          "employee_user",
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        );

        navigate("/"); // Redirect to homepage
      } else {
        window.alert("Invalid login"); // Show alert if email isn't found
      }
    });
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
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

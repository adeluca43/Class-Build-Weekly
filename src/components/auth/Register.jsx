import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEmployee, getEmployeeByEmail } from "../../services/employeeService"

export const Register = () => {
  const [employee, setEmployee] = useState({
    email: "",
    fullName: "",
    password: "",
  })
  let navigate = useNavigate()

  const registerNewEmployee = () => {
    const newEmployee = {
      email: employee.email.toLowerCase(),
      name: employee.fullName,
      password: employee.password,
    }

    createEmployee(newEmployee).then((createdEmployee) => {
      if (createdEmployee?.id) {
        localStorage.setItem(
          "employee_data",
          JSON.stringify({
            id: createdEmployee.id,
            name: createdEmployee.name,
            email: createdEmployee.email,
          })
        )
        navigate("/")
      }
    })
  }

  const handleRegister = (event) => {
    event.preventDefault();

    //Check for required fields before API call
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







  const updateEmployee = (evt) => {
    const { id, value } = evt.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [id]: value  //updates password 
    }));
  };
  
  

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Employee Class Tracker</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateEmployee}
              type="text"
              id="fullName"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateEmployee}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
    <input
      onChange={updateEmployee}
      type="password"
      id="password"
      className="auth-form-input"
      placeholder="Create a password"
      required
    />
  </fieldset>




        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}
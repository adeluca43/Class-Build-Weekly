import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEmployee, getEmployeeByEmail } from "../../services/employeeService"

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      email: user.email.toLowerCase(),
      name: user.fullName,
    }

    createEmployee(newUser).then((createdUser) => {
      if (createdUser?.id) {
        localStorage.setItem(
          "employee_user",
          JSON.stringify({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
          })
        )
        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getEmployeeByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.id === "cohort" ? `Cohort ${evt.target.value}` : evt.target.value;
    setUser(copy);
  };
  

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Employee Class Tracker</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
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
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
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
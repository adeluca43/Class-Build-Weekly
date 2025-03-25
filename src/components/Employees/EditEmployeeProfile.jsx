import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateEmployee } from "../../services/employeeService";

export const EditEmployeeProfile = ({ currentEmployee }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    payRate: "",
    beltRank: "",
    password: "",
  });

  useEffect(() => {
    if (currentEmployee) {
      setEmployee({
        id: currentEmployee.id,
        name: currentEmployee.name || "", // Ensure it's always a string
        address: currentEmployee.address || "",
        phone: currentEmployee.phone || "",
        email: currentEmployee.email || "",
        payRate: currentEmployee.payRate || "",
        beltRank: currentEmployee.beltRank || "",
        password: currentEmployee.password || "",
      });
    }
  }, [currentEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  // Handles form submission:
  // Prevents page reload, updates employee info in the database,
  // saves the updated employee to localStorage, and redirects to profile page
  const handleSubmit = async (event) => {
    event.preventDefault();
    {
      const updatedEmployee = await updateEmployee(employee.id, employee);
      localStorage.setItem("employee_data", JSON.stringify(updatedEmployee));
      navigate("/profile");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-success">Edit Employee Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={employee.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-bold">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              value={employee.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Phone Number:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={employee.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="payRate" className="form-label fw-bold">
              Pay Rate:
            </label>
            <select
              id="payRate"
              name="payRate"
              className="form-select"
              value={employee.payRate}
              onChange={handleChange}
            >
              <option value="">Select Pay Rate</option>
              <option value="12">$12 per shift</option>
              <option value="15">$15 per shift</option>
              <option value="20">$20 per shift</option>
              <option value="25">$25 per shift</option>
              <option value="30">$30 per shift</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="beltRank" className="form-label fw-bold">
              Belt Rank:
            </label>
            <select
              id="beltRank"
              name="beltRank"
              className="form-select"
              value={employee.beltRank}
              onChange={handleChange}
            >
              <option value="">Select Belt Rank</option>
              <option value="Yellow/Orange/Green">Yellow/Orange/Green</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
              <option value="Brown">Brown</option>
              <option value="Black">Black</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn fw-bold"
            style={{
              backgroundColor: "goldenrod",
              color: "black",
              border: "none",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

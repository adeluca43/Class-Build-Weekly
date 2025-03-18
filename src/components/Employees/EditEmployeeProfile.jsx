import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EditEmployeeProfile = () => {
    const navigate = useNavigate ();
    const [employee, setEmployee] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        payRate: "",
        beltRank: "",
    });

    useEffect(() => {
        // Fetch current employee details from localStorage or API
        const storedEmployee = JSON.parse(localStorage.getItem("employee_user"));
        if (storedEmployee) {
            setEmployee({
                id: storedEmployee.id, 
                name: storedEmployee.name || "",   // Ensure it's always a string
                address: storedEmployee.address || "", 
                phone: storedEmployee.phone || "",  
                email: storedEmployee.email || "",
                payRate: storedEmployee.payRate || "",
                beltRank: storedEmployee.beltRank || "",
            });
        } 
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedEmployee = {
            ...employee, // Keep existing user details, especially ID
        };

        // Save to localStorage
        localStorage.setItem("employee_user", JSON.stringify(updatedEmployee));

        // If using an API, update the backend
        fetch(`http://localhost:8088/employees/${employee.id}`, {
            method: "PUT",  
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEmployee),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update employee in the database");
            }
            return response.json();
        })
        .then(() => {
        
            navigate("/profile");  // Navigate after successful save
        })
    
    };

    

    return (
        <div className="edit-employee-profile"> 
            <h2>Edit Employee Profile</h2>
<form onSubmit={handleSubmit}>
            <label className="name">Full Name:</label>
            <input 
                type="text"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
            />

            <label className="address">Address:</label>
            <input 
                type="text"
                id="address"
                name="address"
                value={employee.address}
                onChange={handleChange}
            />

            <label className="phone">Phone Number:</label>
            <input 
                type="text"
                id="phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
            />

            <label className="email">Email Address:</label>
            <input 
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
            />

            <label className="payRate">Pay Rate:</label>
            <select
                id="payRate"
                name="payRate"
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

            <label className="beltRank">Belt Rank:</label>
            <select
                id="beltRank"
                name="beltRank"
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

<button type="submit">Save Changes</button>
</form>
</div>
);
};
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateEmployee } from "../../services/employeeService";

export const EditEmployeeProfile = () => {
    const navigate = useNavigate ();
    const [employee, setEmployee] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
        payRate: "",
        beltRank: "",
        password: ""
    });

    useEffect(() => {
        // Fetch current employee details from localStorage or API
        const storedEmployee = JSON.parse(localStorage.getItem("employee_data"));
        if (storedEmployee) {
            setEmployee({
                id: storedEmployee.id, 
                name: storedEmployee.name || "",   // Ensure it's always a string
                address: storedEmployee.address || "", 
                phone: storedEmployee.phone || "",  
                email: storedEmployee.email || "",
                payRate: storedEmployee.payRate || "",
                beltRank: storedEmployee.beltRank || "",
                 password: storedEmployee.password || "",
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
   
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const updatedEmployee = await updateEmployee(employee.id, employee);
            localStorage.setItem("employee_data", JSON.stringify(updatedEmployee));
            navigate("/profile");
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };
    

    

    return (
        <div > 
            <h2>Edit Employee Profile</h2>
<form onSubmit={handleSubmit}>
            <label >Full Name:</label>
            <input 
                type="text"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
            />

            <label >Address:</label>
            <input 
                type="text"
                id="address"
                name="address"
                value={employee.address}
                onChange={handleChange}
            />

            <label >Phone Number:</label>
            <input 
                type="text"
                id="phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
            />

            <label >Email Address:</label>
            <input 
                type="email"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
            />

            <label>Pay Rate:</label>
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

            <label >Belt Rank:</label>
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
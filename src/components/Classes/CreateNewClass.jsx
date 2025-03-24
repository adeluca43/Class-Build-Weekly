import { useState, useEffect } from "react";
import { getClassTypes, getShifts } from "../../services/classService";
import { makeNewClass } from "../../services/classService";
import { useNavigate } from "react-router-dom";

export const CreateNewClass = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);
  const [newClass, setNewClass] = useState({
    className: "",
    description: "",
    classType: "",
    dayOfWeek: "",
    timeSlot: "",
  });

  const [classTypes, setClassTypes] = useState([]);

  useEffect(() => {
    getClassTypes().then(setClassTypes);

    getShifts().then(setShifts);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewClass((prevClass) => ({
      ...prevClass,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const loggedInEmployee = JSON.parse(localStorage.getItem("employee_data")); // Get the logged-in employee

    const newClassData = {
      className: newClass.className,
      description: newClass.description,
      classType: newClass.classType,
      dayOfWeek: newClass.dayOfWeek,
      timeSlot: newClass.timeSlot,
      employeeId: loggedInEmployee.id,
      employeeName: loggedInEmployee.name,
    };

    makeNewClass(newClassData)
      .then(() => {
        navigate("/all-classes"); 
      })

    // Reset form after submission
    setNewClass({
      className: "",
      description: "",
      classType: "",
      dayOfWeek: "",
      timeSlot: "",
    });
  };
  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h1 className="text-success mb-4">Add New Class</h1>
  
        <form onSubmit={handleSubmit}>
          {/* Class Name */}
          <div className="mb-3">
            <label htmlFor="className" className="form-label fw-bold">Class Name:</label>
            <input
              type="text"
              id="className"
              name="className"
              className="form-control"
              value={newClass.className}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Class Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">Class Description:</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={newClass.description}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Class Type Dropdown */}
          <div className="mb-3">
            <label htmlFor="classType" className="form-label fw-bold">Class Type:</label>
            <select
              id="classType"
              name="classType"
              className="form-select"
              value={newClass.classType}
              onChange={handleChange}
              required
            >
              <option value="">Select Class Type</option>
              {classTypes.map((type) => (
                <option key={type.id} value={type.type}>
                  {type.type}
                </option>
              ))}
            </select>
          </div>
  
          {/* Day of Week Dropdown */}
          <div className="mb-3">
            <label htmlFor="dayOfWeek" className="form-label fw-bold">Day of the Week:</label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              className="form-select"
              value={newClass.dayOfWeek}
              onChange={handleChange}
              required
            >
              <option value="">Select a Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
  
          {/* Time Slot Dropdown */}
          <div className="mb-4">
            <label htmlFor="timeSlot" className="form-label fw-bold">Time Slot:</label>
            <select
              id="timeSlot"
              name="timeSlot"
              className="form-select"
              value={newClass.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="">Select Time Slot</option>
              {shifts.map((shift) => (
                <option key={shift.id} value={shift.timeSlot}>
                  {shift.timeSlot}
                </option>
              ))}
            </select>
          </div>
  
          {/* Save Button */}
          <button
            type="submit"
            className="btn fw-bold w-100"
            style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
  
  
};

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
    <div>
      <h1>Add New Class</h1>
      <form onSubmit={handleSubmit}>
        {/* Class Name */}
        <label>Class Name:</label>
        <input
          type="text"
          id="className"
          name="className"
          value={newClass.className}
          onChange={handleChange}
          required
        />

        {/* Class Description */}
        <label>Class Description:</label>
        <textarea
          id="description"
          name="description"
          value={newClass.description}
          onChange={handleChange}
          required
        />

        {/* Class Type Dropdown */}
        <label>Class Type:</label>
        <select
          id="classType"
          name="classType"
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

        {/* Day of Week Dropdown */}
        <label>Day of the Week:</label>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
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

        {/* Time Slot Dropdown */}
        <label>Time Slot:</label>
        <select
          id="timeSlot"
          name="timeSlot"
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

        {/* Save Button */}
        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>
    </div>
  );
};

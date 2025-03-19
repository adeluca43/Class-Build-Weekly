import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassTypes, getAllClasses, getShifts, updateClass } from "../../services/classService";

export const EditClass = () => {
  const { classId } = useParams(); // Get class ID from URL
  const navigate = useNavigate();

  const [classData, setClassData] = useState({
    className: "",
    description: "",
    classType: "",
    dayOfWeek: "",
    timeSlot: "",
  });

  const [classTypes, setClassTypes] = useState([]); // Store class type options
  const [shiftOptions, setShiftOptions] = useState([]); // Store shift options

  useEffect(() => {
    // Fetch class details
    getAllClasses().then((allClasses) => {
      const classToEdit = allClasses.find((cls) => cls.id === parseInt(classId));
      if (classToEdit) {
        setClassData(classToEdit);
      }
    });

    // Fetch class types and shifts before rendering
    getClassTypes()
      .then(setClassTypes)

    getShifts()
      .then(setShiftOptions)
  }, [classId]);

  // Handle form field changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setClassData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission using the updateClass function
  const handleSubmit = (event) => {
    event.preventDefault();
// Extract only the necessary fields, excluding the expanded `employee` object
const classDataToSave = {
    id: classData.id,
    className: classData.className,
    description: classData.description,
    classType: classData.classType,
    dayOfWeek: classData.dayOfWeek,
    timeSlot: classData.timeSlot,
    employeeId: classData.employeeId, // Keep employeeId but remove employee object
  };

  updateClass(classId, classDataToSave)
    .then(() => navigate("/all-classes"))
};

  return (
    <div>
      <h2>Edit Class</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Class Name */}
        <label>Class Name:</label>
        <input
          type="text"
          id="className"
          name="className"
          value={classData.className}
          onChange={handleFieldChange}
          required
        />

        {/* Class Description */}
        <label>Class Description:</label>
        <textarea
          id="description"
          name="description"
          value={classData.description}
          onChange={handleFieldChange}
          required
        />

        {/* Day of the Week Dropdown */}
        <label>Day of the Week:</label>
        <select id="dayOfWeek" name="dayOfWeek" value={classData.dayOfWeek} onChange={handleFieldChange}>
          <option value="">Select a Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        {/* Class Type Dropdown */}
        <label>Class Type:</label>
        <select id="classType" name="classType" value={classData.classType} onChange={handleFieldChange} required>
          <option value="">Select Class Type</option>
          {classTypes.map((type) => (
            <option key={type.id} value={type.type}>
              {type.type}
            </option>
          ))}
        </select>

        {/* Time Slot Dropdown */}
        <label>Time Slot:</label>
        <select id="timeSlot" name="timeSlot" value={classData.timeSlot} onChange={handleFieldChange} required>
          <option value="">Select Time Slot</option>
          {shiftOptions.map((shift) => (
            <option key={shift.id} value={shift.timeSlot}>
              {shift.timeSlot}
            </option>
          ))}
        </select>

        {/* Save Button */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};










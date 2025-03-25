import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClassTypes,getAllClasses,getShifts,updateClass} from "../../services/classService";

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

  const [classTypes, setClassTypes] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);

  useEffect(() => {
    getAllClasses().then((allClasses) => {
      const classToEdit = allClasses.find(
        (classObj) => classObj.id === parseInt(classId) //classId from url from useParams
      );
      if (classToEdit) {
        setClassData(classToEdit);
      }
    });

    // Fetch class types and shifts update the state value
    getClassTypes().then(setClassTypes);

    getShifts().then(setShiftOptions);
  }, [classId]);

  // updates form state when input field changes
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setClassData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    // get only the necessary fields
    const classDataToSave = {
      id: classData.id,
      className: classData.className,
      description: classData.description,
      classType: classData.classType,
      dayOfWeek: classData.dayOfWeek,
      timeSlot: classData.timeSlot,
      employeeId: classData.employeeId, 
    };

    updateClass(classId, classDataToSave).then(() => navigate("/all-classes"));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h2 className="text-success mb-4">Edit Class</h2>
  
        <form onSubmit={handleSubmit}>
          {/* Class Name */}
          <div className="mb-3">
            <label htmlFor="className" className="form-label fw-bold">Class Name:</label>
            <input
              type="text"
              id="className"
              name="className"
              className="form-control"
              value={classData.className}
              onChange={handleFieldChange}
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
              value={classData.description}
              onChange={handleFieldChange}
              required
            />
          </div>
  
          {/* Day of the Week */}
          <div className="mb-3">
            <label htmlFor="dayOfWeek" className="form-label fw-bold">Day of the Week:</label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              className="form-select"
              value={classData.dayOfWeek}
              onChange={handleFieldChange}
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
  
          {/* Class Type */}
          <div className="mb-3">
            <label htmlFor="classType" className="form-label fw-bold">Class Type:</label>
            <select
              id="classType"
              name="classType"
              className="form-select"
              value={classData.classType}
              onChange={handleFieldChange}
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
  
          {/* Time Slot */}
          <div className="mb-4">
            <label htmlFor="timeSlot" className="form-label fw-bold">Time Slot:</label>
            <select
              id="timeSlot"
              name="timeSlot"
              className="form-select"
              value={classData.timeSlot}
              onChange={handleFieldChange}
              required
            >
              <option value="">Select Time Slot</option>
              {shiftOptions.map((shift) => (
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

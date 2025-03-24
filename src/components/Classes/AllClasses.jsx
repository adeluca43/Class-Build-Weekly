import { useState, useEffect } from "react";
import {
  getAllClasses,
  deleteClass,
  getClassTypes,
} from "../../services/classService";
import { useNavigate } from "react-router-dom";

export const AllClasses = () => {
  const loggedInEmployee = JSON.parse(localStorage.getItem("employee_data"));

  const [classes, setClasses] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getAllClasses().then((data) => {
      setClasses(data);
    });

    getClassTypes().then((data) => {
      setClassTypes(data);
    });
  }, []);

  // Filtered classes based on selected type
  const filteredClasses = filterType
    ? classes.filter((classItem) => classItem.classType === filterType)
    : classes;

  const handleDelete = async (classId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );
    if (!confirmDelete) return;

    {
      await deleteClass(classId);
      setClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem.id !== classId)
      );
    }
  };

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  
  //  sort timeSlot strings 
  const sortByTimeSlot = (a, b) => {
    return new Date(`1970/01/01 ${a.timeSlot}`) - new Date(`1970/01/01 ${b.timeSlot}`);
  };
  
  return (
    <div className="container mt-4">
      <h1 className="text-success mb-4">Class Calendar</h1>
  
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="filterType" className="form-label fw-bold">Filter by Class Type:</label>
        <select
          id="filterType"
          className="form-select w-auto"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          {classTypes.map((typeObj) => (
            <option key={typeObj.id} value={typeObj.type}>
              {typeObj.type}
            </option>
          ))}
        </select>
      </div>
  
      {/* Calendar Layout by Day of the Week */}
      <div className="d-md-flex flex-md-nowrap flex-wrap gap-3 overflow-auto pb-3">
        {daysOfWeek.map((day) => {
          const dayClasses = filteredClasses
            .filter((c) => c.dayOfWeek === day)
            .sort(sortByTimeSlot);
  
          return (
            <div
              key={day}
              className="flex-shrink-0 mb-4"
              style={{ minWidth: "300px", width: "100%", maxWidth: "300px" }}
            >
              <div className="border p-3 h-100">
                <h5 className="text-success text-center fw-bold mb-3">{day}</h5>
  
                {dayClasses.length === 0 ? (
                  <p className="text-muted text-center">No classes</p>
                ) : (
                  dayClasses.map((classItem) => (
                    <div key={classItem.id} className="card shadow-sm p-2 mb-3">
                      <h6 className="fw-bold text-success">{classItem.className}</h6>
                      <p className="mb-1"><strong>Type:</strong> {classItem.classType}</p>
                      <p className="mb-1"><strong>Time:</strong> {classItem.timeSlot}</p>
                      <p className="mb-2"><strong>Instructor:</strong> {classItem.employee?.name}</p>
  
                      {loggedInEmployee?.id === classItem.employee?.id && (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm fw-bold"
                            style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
                            onClick={() => navigate(`/edit-class/${classItem.id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm fw-bold"
                            style={{ backgroundColor: "goldenrod", color: "black", border: "none" }}
                            onClick={() => handleDelete(classItem.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
  
};

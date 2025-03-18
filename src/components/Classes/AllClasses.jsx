
import { useState, useEffect } from "react";
import { getAllClasses, deleteClass, getClassTypes } from "../../services/classService";
import { useNavigate } from "react-router-dom";

export const AllClasses = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("employee_user")); 

    const [classes, setClasses] = useState([]);
    const [classTypes, setClassTypes] = useState([]);
    const [filterType, setFilterType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getAllClasses()
            .then((data) => {
                setClasses(data);
            })

        getClassTypes()
            .then(setClassTypes)
    }, []);

    // Filtered classes based on selected type
    const filteredClasses = filterType
        ? classes.filter((classItem) => classItem.classType === filterType)
        : classes;

    const handleDelete = async (classId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this class?");
        if (!confirmDelete) return;

         {
            await deleteClass(classId);
            setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== classId));
        }
    };

    return (
        <div className="allClassesContainer">
            <h1>All Classes</h1>

            {/* Filter Dropdown */}
            <label>Filter by Class Type:</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">All Types</option>
                {classTypes.map((typeObj) => (
                    <option key={typeObj.id} value={typeObj.type}>
                        {typeObj.type}
                    </option>
                ))}
            </select>

            {/* Class List */}
            <div>
                {filteredClasses.map((classItem) => {
                   

                    return (
                        <div key={classItem.id} className="classCard">
                            <strong>{classItem.employee?.name}</strong>
                            <p><strong>Class Type:</strong> {classItem.classType}</p>
                            <p><strong>Class Name:</strong> {classItem.className}</p>
                            <p><strong>Day:</strong> {classItem.dayOfWeek}</p>
                            <p><strong>Time Slot:</strong> {classItem.timeSlot}</p>

                            {/* Show buttons only for the class creator */}
                            {loggedInUser?.id === classItem.employee?.id && (
                                <div className="actionButtons">
                                    <button onClick={() => navigate(`/edit-class/${classItem.id}`)}>Edit</button>
                                    <button onClick={() => handleDelete(classItem.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};



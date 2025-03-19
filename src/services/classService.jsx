
// get class type
export const getClassTypes = () => {
    return fetch("http://localhost:8088/classTypes")
        .then(res => res.json());
};
// get shifts
export const getShifts = () => {
    return fetch("http://localhost:8088/shifts")
        .then(res => res.json());
};

// for create new class file
export const makeNewClass = (newClass) => {
    return fetch("http://localhost:8088/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
    }).then(res => res.json());
};


// for all classes
export const getAllClasses = () => {
    return fetch("http://localhost:8088/classes?_expand=employee", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    }).then(res => res.json());
};

export const deleteClass = (classId) => {
    return fetch(`http://localhost:8088/classes/${classId}`, {
        method: "DELETE",
    });
};

// Update class details
export const updateClass = (classId, updatedClassData) => {
    return fetch(`http://localhost:8088/classes/${classId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClassData),
    }).then(res => res.json());
};

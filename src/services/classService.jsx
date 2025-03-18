//get class types & shifts to create new class

export const getClassTypes = () => {
    return fetch("http://localhost:8088/classTypes")
        .then(res => res.json());
};

export const getShifts = () => {
    return fetch("http://localhost:8088/shifts")
        .then(res => res.json());
};

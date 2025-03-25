// used to get full details for profile
export const getEmployeeById = (id) =>
  fetch(`http://localhost:8088/employees/${id}`).then((res) => res.json());

// Fetch employee by email (used during login)
export const getEmployeeByEmail = (email) =>
  fetch(`http://localhost:8088/employees?email=${email}`).then((res) =>
    res.json()
  );

//used during registration
export const createEmployee = (employee) => {
  return fetch("http://localhost:8088/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

// Update employee details (used in Edit Profile)
export const updateEmployee = (id, updatedEmployee) => {
  return fetch(`http://localhost:8088/employees/${id}`)
    .then((res) => res.json())
    .then((existingEmployee) => ({
      ...updatedEmployee,
      password: updatedEmployee.password || existingEmployee.password, //Keep old password if not changed
    }))
    .then((employeeToUpdate) =>
      fetch(`http://localhost:8088/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeToUpdate),
      })
    )
    .then((res) => res.json());
};

// Fetch all employees for directory page
export const getAllEmployees = () =>
    fetch("http://localhost:8088/employees").then((res) => res.json());
  
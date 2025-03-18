// used to get full details for profile
export const getEmployeeById = (id) => 
    fetch(`http://localhost:8088/employees/${id}`).then(res => res.json());
  

// Fetch employee by email (used during login)
export const getEmployeeByEmail = (email) => 
    fetch(`http://localhost:8088/employees?email=${email}`).then(res => res.json());

export const createEmployee = (user) => {
    return fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json())
  }
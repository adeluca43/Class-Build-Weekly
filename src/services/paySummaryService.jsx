/* Save payroll submission to the database
export const submitPayroll = (payrollData) => {
  return fetch("http://localhost:8088/paySummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payrollData),
  }).then((res) => res.json());
};

// Check if payroll has already been submitted for the current week
export const checkExistingPayroll = (employeeId) => {
  return fetch(
    `http://localhost:8088/paySummary?employeeId=${employeeId}`
  ).then((res) => res.json());
};
*/
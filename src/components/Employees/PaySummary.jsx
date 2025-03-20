import { useState, useEffect } from "react";
import { getAllClasses } from "../../services/classService";
import { submitPayroll,checkExistingPayroll } from "../../services/paySummaryService";

export const PaySummary = () => {
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loggedInEmployee = JSON.parse(localStorage.getItem("employee_data"));

    if (loggedInEmployee) {
      getAllClasses()
        .then((allClasses) => {
          const employeeClasses = allClasses.filter(
            (allClass) => allClass.employeeId === loggedInEmployee.id
          );

          setTotalClasses(employeeClasses.length);

          const payRate = loggedInEmployee.payRate || 0;
          setTotalPay(employeeClasses.length * payRate);
        })

      // Check if payroll has already been submitted for this week
      checkExistingPayroll(loggedInEmployee.id).then((paySummaries) => {
        const currentWeek = new Date().toISOString().slice(0, 10); // Get current week in YYYY-MM-DD format slice takes the first 10 characters

        const existingPayroll = paySummaries.find((entry) =>
          entry.date.startsWith(currentWeek) // Check if payroll exists for this week
        );

        if (existingPayroll) {
          setIsSubmitted(true);
          setErrorMessage("You have already submitted payroll for this week.");
        }
      });
    }
  }, []);

  const handleSubmit = () => {
    const loggedInEmployee = JSON.parse(localStorage.getItem("employee_data"));

    const payrollData = {
      employeeId: loggedInEmployee.id,
      employeeName: loggedInEmployee.name,
      totalClasses: totalClasses,
      payRate: loggedInEmployee.payRate,
      totalPay: totalPay,
      date: Date().toString().split(" ").slice(0, 5).join(" ") // split makes an array of each word, join puts them back together, slice take the first 5 elements( day,month,date,year,time)

    };

    submitPayroll(payrollData)
      .then(() => {
        setIsSubmitted(true);
        alert("Congrats! You've submitted your pay for review.");
      })
  };

  return (
    <div >
      <h2>Weekly Pay Summary</h2>
      <p>Total number of classes created: <strong>{totalClasses}</strong></p>
      <p>Total Pay for the week: <strong>${totalPay.toFixed(2)}</strong></p>

      {errorMessage && <p>{errorMessage}</p>}


      <button onClick={handleSubmit} disabled={isSubmitted}>
        {isSubmitted ? "Submitted" : "Submit Payroll"}
      </button>
    </div>
  );
};


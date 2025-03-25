import { useState, useEffect } from "react";
import { getAllEmployees} from "../../services/employeeService";

export const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((data) => {
      setEmployees(data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-4">Employee Directory</h2>

      <div className="row">
        {employees.map((employee) => (
          <div key={employee.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card p-3 bg-light shadow-sm">
              <h5 className="fw-bold mb-2">{employee.name}</h5>
              <p className="mb-1">
                <strong>Phone:</strong> {employee.phone}
              </p>
              <p className="mb-0">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${employee.email}`} className="text-decoration-none text-primary fw-semibold">
                  {employee.email}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
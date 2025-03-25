
import { Routes, Route } from "react-router-dom";
import { EmployeeProfile } from "../components/Employees/EmployeeProfile";
import { useState,useEffect } from "react";
import { NavBar } from "../nav/NavBar";
import { EditEmployeeProfile } from "../components/Employees/EditEmployeeProfile";
import { CreateNewClass } from "../components/Classes/CreateNewClass";
import { AllClasses } from "../components/Classes/AllClasses";
import { EditClass } from "../components/Classes/EditClass";
import { Curriculum } from "../components/Curriculum";
import { EmployeeDirectory } from "../components/Employees/EmployeeDirectory";

export const ApplicationView = () => {
const [currentEmployee, setCurrentEmployee] = useState ([])


    useEffect(() => {
        const storedEmployee = localStorage.getItem("employee_data");
        if (storedEmployee) {
          setCurrentEmployee(JSON.parse(storedEmployee));
        }
      }, []);
      

  return (
    <>
    <NavBar currentEmployee={currentEmployee} />
    <Routes>
      <Route path="/all-classes" element={<AllClasses currentEmployee={currentEmployee}/>} />
      <Route path="/profile" element={<EmployeeProfile currentEmployee={currentEmployee}/>} />
      <Route path="/profile/edit" element={<EditEmployeeProfile currentEmployee={currentEmployee} />} />
      <Route path="/new-class" element={<CreateNewClass currentEmployee={currentEmployee}/>} />
      <Route path="/edit-class/:classId" element={<EditClass/>} />
      <Route path="/curriculum" element={<Curriculum/>} />
      <Route path="/employee-directory" element={<EmployeeDirectory/>} />
    </Routes>
    </>
  );
};

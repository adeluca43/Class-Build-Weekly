
import { Routes, Route } from "react-router-dom";
import { EmployeeProfile } from "../components/Employees/EmployeeProfile";
import { Login } from "../components/auth/Login";
import { useState,useEffect } from "react";
import { NavBar } from "../nav/NavBar";
import { EditEmployeeProfile } from "../components/Employees/EditEmployeeProfile";
import { CreateNewClass } from "../components/Classes/CreateNewClass";
import { AllClasses } from "../components/Classes/AllClasses";
import { EditClass } from "../components/Classes/EditClass";
import { Curriculum } from "../components/Curriculum";

export const ApplicationView = () => {
const [currentEmployee, setCurrentEmployee] = useState ([])


    useEffect(() => {
        const localEmployeeEmployee = localStorage.getItem("employee_data");
        if (localEmployeeEmployee) {
          setCurrentEmployee(JSON.parse(localEmployeeEmployee));
        }
      }, []);
      

  return (
    <>
    <NavBar currentEmployee={currentEmployee} />
    <Routes>
      <Route path="/all-classes" element={<AllClasses/>} />
      <Route path="/profile" element={<EmployeeProfile/>} />
      <Route path="/profile/edit" element={<EditEmployeeProfile />} />
      <Route path="/new-class" element={<CreateNewClass/>} />
      <Route path="/edit-class/:classId" element={<EditClass/>} />
      <Route path="/curriculum" element={<Curriculum/>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  );
};

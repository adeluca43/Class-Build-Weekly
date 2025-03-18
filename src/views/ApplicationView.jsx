
import { Routes, Route } from "react-router-dom";
import { EmployeeProfile } from "../components/Employees/EmployeeProfile";
import { Login } from "../components/auth/Login";
import { useState,useEffect } from "react";
import { NavBar } from "../nav/NavBar";
import { EditEmployeeProfile } from "../components/Employees/EditEmployeeProfile";
import { CreateNewClass } from "../components/Classes/CreateNewClass";
import { AllClasses } from "../components/Classes/AllClasses";
import { EditClass } from "../components/Classes/EditClass";

export const ApplicationView = () => {
const [currentUser, setCurrentUser] = useState ([])


    useEffect(() => {
        const localEmployeeUser = localStorage.getItem("employee_user");
        if (localEmployeeUser) {
          setCurrentUser(JSON.parse(localEmployeeUser));
        }
      }, []);
      

  return (
    <>
    <NavBar currentUser={currentUser} />
    <Routes>
      <Route path="/all-classes" element={<AllClasses/>} />
      <Route path="/profile" element={<EmployeeProfile/>} />
      <Route path="/profile/edit" element={<EditEmployeeProfile />} />
      <Route path="/new-class" element={<CreateNewClass/>} />
      <Route path="/edit-class" element={<EditClass/>} />
      <Route path="/pay-summary" element={<h1>Pay Summary</h1>} />
      <Route path="/curriculum" element={<h1>Curriculum </h1>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  );
};

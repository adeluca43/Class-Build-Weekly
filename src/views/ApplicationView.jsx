
import { Routes, Route } from "react-router-dom";
import { EmployeeProfile } from "../components/Employees/EmployeeProfile";
import { Login } from "../components/auth/Login";
import { useState,useEffect } from "react";
import { NavBar } from "../nav/NavBar";
import { EditEmployeeProfile } from "../components/Employees/EditEmployeeProfile";
import { CreateNewClass } from "../components/Classes/CreateNewClass";

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
      <Route path="/" element={<h1>All Classes</h1>} />
      <Route path="/profile" element={<EmployeeProfile/>} />
      <Route path="/profile/edit" element={<EditEmployeeProfile />} />
      <Route path="/new-class" element={<CreateNewClass/>} />
      <Route path="/pay-summary" element={<h1>Pay Summary</h1>} />
      <Route path="/curriculum" element={<h1>Curriculum </h1>} />
      <Route path="/login" element={<Login/>} />
    </Routes>
    </>
  );
};

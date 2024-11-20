import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import "./department.css";
import Department from "../../Components/DepartmentDetails/Department";

const Departments = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Department />
      </div>
    </>
  );
};

export default Departments;

import React from "react";
import "../Dashboard/dashboard.css";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import PatientsLog from "../../../Components/UserManagement/PatientsLog/PatientsLog";

const PatientsLogs = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <PatientsLog/>
      </div>
    </>
  );
};

export default PatientsLogs;

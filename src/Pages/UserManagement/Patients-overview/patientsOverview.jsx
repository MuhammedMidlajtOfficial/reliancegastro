import React from "react";
import "../Dashboard/dashboard.css";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import PatientsOverview from "../../../Components/UserManagement/Patients-overview/patientsOverview";

const PatientsOverviews = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <PatientsOverview />
      </div>
    </>
  );
};

export default PatientsOverviews;

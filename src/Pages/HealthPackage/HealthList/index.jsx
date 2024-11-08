import React from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import HealthList from "../../../Components/HealthPackage/healthPackageList";
import "./health.css"

const HealthLists = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <HealthList />
      </div>
    </>
  );
};

export default HealthLists;

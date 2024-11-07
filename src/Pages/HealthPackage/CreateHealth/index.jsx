import React from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import HealthCheckupForm from "../../../Components/HealthPackage/CreateHealthPackage";

const Health = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <HealthCheckupForm />
      </div>
    </>
  );
};

export default Health;

import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import "./doctor.css";
import Doctor from "../../Components/Doctor/Doctor";

const Doctors = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Doctor />
      </div>
    </>
  );
};

export default Doctors;

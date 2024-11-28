import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import "./education.css";
import Education from "../../Components/Education/Education";

const Educations = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Education />
      </div>
    </>
  );
};

export default Educations;

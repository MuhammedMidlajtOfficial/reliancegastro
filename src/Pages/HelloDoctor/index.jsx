import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import "./helloDoctor.css";
import HelloDoctor from "../../Components/HelloDoctor/HelloDoctor";

const HelloDoctors = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <HelloDoctor />
      </div>
    </>
  );
};

export default HelloDoctors;

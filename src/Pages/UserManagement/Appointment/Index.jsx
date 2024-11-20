import React from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import "./appointment.css";
import Appointment from "../../../Components/Appointment/Appointment";

const Appointments = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Appointment />
      </div>
    </>
  );
};

export default Appointments;

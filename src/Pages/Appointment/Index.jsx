import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Appoint from '../../Components/Appointment/Appoint';

const Appointment = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
      <Appoint />
      </div>
    </>
  );
};
export default Appointment;

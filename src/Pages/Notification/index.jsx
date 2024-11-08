import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Notification from "../../Components/Notification/Notification";

const Notifications = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Notification />
      </div>
    </>
  );
};
export default Notifications;

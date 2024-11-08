import React from "react";
import "../Dashboard/dashboard.css";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import RecentActivities from "../../../Components/UserManagement/RecentActivities/RecentActivities";

const RecentActivitie = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <RecentActivities/>
      </div>
    </>
  );
};

export default RecentActivitie;

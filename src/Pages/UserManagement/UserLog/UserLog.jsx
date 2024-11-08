import React from "react";
import "../Dashboard/dashboard.css";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import UserLog from "../../../Components/UserManagement/UserLog/UserLog";

const UserLogs = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <UserLog/>
      </div>
    </>
  );
};

export default UserLogs;

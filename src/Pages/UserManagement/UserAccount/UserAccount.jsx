import React from "react";
import "../Dashboard/dashboard.css";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import UserAccount from "../../../Components/UserManagement/UserAccount/UserAccount";

const UserAccounts = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <UserAccount/>
      </div>
    </>
  );
};

export default UserAccounts;

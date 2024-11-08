import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Settings from "../../Components/Settings/Settings";

const Setting = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Settings />
      </div>
    </>
  );
};
export default Setting;

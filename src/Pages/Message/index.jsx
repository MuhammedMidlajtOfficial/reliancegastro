import React from "react";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Message from "../../Components/Messages/Messages";

const Messages = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Message />
      </div>
    </>
  );
};
export default Messages;

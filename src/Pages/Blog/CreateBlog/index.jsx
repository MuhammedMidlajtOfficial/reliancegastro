import React from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import CreateBlog from "../../../Components/Blog/CreateBlog";

const CreateBlogs = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <CreateBlog />
      </div>
    </>
  );
};

export default CreateBlogs;

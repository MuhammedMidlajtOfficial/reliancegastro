import React from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import BlogList from "../../../Components/Blog/BlogList";
import "./blog.css";

const BlogLists = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <BlogList />
      </div>
    </>
  );
};

export default BlogLists;

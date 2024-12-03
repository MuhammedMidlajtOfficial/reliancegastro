import React from "react";
import "./Post.css";
import Sidebar from "../../Layout/Sidebar";
import Header from "../../Layout/Header";
import Post from "../../Components/Post/Post";

const Posts = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <Post />
      </div>
    </>
  );
};

export default Posts;

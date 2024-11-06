import React from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import NewsList from "../../../Components/News/newsList";

const NewsLists = () => {
  return (
    <>
      <Sidebar />
      <Header />

      <div className="main-wrapper">
        <NewsList />
      </div>
    </>
  );
};

export default NewsLists;

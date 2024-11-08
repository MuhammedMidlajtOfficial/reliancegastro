import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protect from "./Protected";
import ForgotPassword from "./Auth/ForgotPassword";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import Dashboard from "./Pages/Dashboard/Index";
import Patient from "./Pages/Patients/index";
import New from "./Pages/News/CreateNews";
import Health from "./Pages/HealthPackage/CreateHealth";
import NewsLists from "./Pages/News/NewsList";
import HealthLists from "./Pages/HealthPackage/HealthList";
import CreateBlogs from "./Pages/Blog/CreateBlog";
import BlogLists from "./Pages/Blog/BlogList";
import Appointment from "./Pages/Appointment/Index";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/overview" element={<Protect Component={Dashboard} />} />
          <Route path="/appointments" element={<Protect Component={Appointment} />} />
          <Route path="/patients" element={<Protect Component={Patient} />} />
          <Route path="/news" element={<Protect Component={New} />} />
          <Route path="/newsList" element={<Protect Component={NewsLists} />} />
          <Route path="/blog" element={<Protect Component={CreateBlogs} />} />
          <Route path="/blogList" element={<Protect Component={BlogLists} />} />
          <Route path="/health" element={<Protect Component={Health} />} />
          <Route
            path="/healthList"
            element={<Protect Component={HealthLists} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

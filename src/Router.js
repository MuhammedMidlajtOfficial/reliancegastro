import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protect from "./Protected";
import ForgotPassword from "./Auth/ForgotPassword";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import Dashboard from "./Pages/UserManagement/Dashboard/Index";
import Patient from "./Pages/Patients/index";
import New from "./Pages/News/CreateNews";
import Health from "./Pages/HealthPackage/CreateHealth";
import NewsLists from "./Pages/News/NewsList";
import HealthLists from "./Pages/HealthPackage/HealthList";
import CreateBlogs from "./Pages/Blog/CreateBlog";
import BlogLists from "./Pages/Blog/BlogList";
import Appointment from "./Pages/UserManagement/Appointment/Index";
import PatientsOverviews from "./Pages/UserManagement/Patients-overview/patientsOverview";
import PatientsLogs from "./Pages/UserManagement/PatientsLog/PatientsLog";
import RecentActivitie from "./Pages/UserManagement/RecentActivities/RecentActivities";
import UserAccounts from "./Pages/UserManagement/UserAccount/UserAccount";
import UserLogs from "./Pages/UserManagement/UserLog/UserLog";
import Messages from "./Pages/Message";
import Setting from "./Pages/Setting";
import Notifications from "./Pages/Notification";
import Doctors from "./Pages/Doctors";
import Departments from "./Pages/DepartmentDetails";


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
          <Route path="/patients-overview" element={<Protect Component={PatientsOverviews} />} />
          <Route path="/patient-logs" element={<Protect Component={PatientsLogs} />} />
          <Route path="/recent-activities" element={<Protect Component={RecentActivitie} />} />
          <Route path="/user-accounts" element={<Protect Component={UserAccounts} />} />
          <Route path="/user-logs" element={<Protect Component={UserLogs} />} />
          <Route path="/messages" element={<Protect Component={Messages} />} />
          <Route path="/notification" element={<Protect Component={Notifications} />} />
          <Route path="/setting" element={<Protect Component={Setting} />} />
          <Route path="/patients" element={<Protect Component={Patient} />} />
          <Route path="/news" element={<Protect Component={New} />} />
          <Route path="/newsList" element={<Protect Component={NewsLists} />} />
          <Route path="/blog" element={<Protect Component={CreateBlogs} />} />
          <Route path="/blogList" element={<Protect Component={BlogLists} />} />
          <Route path="/health" element={<Protect Component={Health} />} />
          <Route path="/healthList" element={<Protect Component={HealthLists} />} />
          <Route path="/doctor" element={<Protect Component={Doctors} />} />
          <Route path="/department" element={<Protect Component={Departments} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

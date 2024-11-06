import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protect from "./Protected";
import ForgotPassword from "./Auth/ForgotPassword";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import Dashboard from "./Pages/Dashboard/Index";
import Patient from "./Pages/Patients/index";
import New from "./Pages/News";
import Health from "./Pages/HealthPackage";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/overview"
            element={<Protect Component={Dashboard} />}
          />
          <Route path="/patients"
          element={<Protect Component={Patient} />}/>
          <Route path="/news"
          element={<Protect Component={New} />}/>
          <Route path="/health"
          element={<Protect Component={Health} />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

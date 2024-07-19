import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protect from "./Protected";
import ForgotPassword from "./Auth/ForgotPassword";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import ResetPassword from "./Auth/ResetPassword";
import Dashboard from "./Pages/Dashboard/Index";

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
            path="/dashboard"
            element={<Protect Component={Dashboard} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

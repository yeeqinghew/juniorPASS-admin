import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLandingLayout from "../layout/AdminLandingLayout";
import AdminHomeLayout from "../layout/AdminHomeLayout";
import AdminLogin from "../components/Login";
import Home from "../components/Home";
import Partners from "../components/Partners";
import Parents from "../components/Users/Parents";
import Children from "../components/Users/Children";

const Routers = () => {
  return (
    <>
      <link
        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
        rel="stylesheet"
        type="text/css"
      ></link>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/*" element={<AdminLandingLayout />}>
          <Route path="login" element={<AdminLogin />}></Route>
          <Route element={<AdminHomeLayout />}>
            <Route path="home" element={<Home />}></Route>
            <Route path="parents" element={<Parents />}></Route>
            <Route path="children" element={<Children />}></Route>
            <Route path="partners" element={<Partners />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Routers;

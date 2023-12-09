import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AppHome from "./Pages/AppHome";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OwnerContact from "./Pages/OwnerContact";
import Signup from "./Pages/Signup";

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<AppHome />}>
          <Route index exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/Home" element={<Home />} />
         
          <Route exact path="/contact" element={<OwnerContact />} />
        </Route>
      </Routes>
    </>
  );
}

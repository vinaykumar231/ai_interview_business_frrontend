import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginProvider, useLogin } from "./auth/LoginContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Resume_result from "./components/Resume_result";

function App() {
  const { user }:any = useLogin(); 
  const isHR = user?.user_type === "HR"; 

  return (
    <div className="App bg-black">
      <LoginProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/resume-result"
              element={isHR ? <Resume_result /> : <Navigate to="/" replace />}
            />
          </Routes>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;

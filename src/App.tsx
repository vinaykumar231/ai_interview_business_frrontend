import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginProvider, useLogin } from "./auth/LoginContext";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Login from "./auth/Login";
import Resume_result from "./components/Resume_result";
import Topbar from "./auth/Topbar";
import ResumeUpload from "./components/ResumeUpload";
import SelectedCandidates from "./components/SelectedCandidates";
import Candidate_Interview from "./components/Candidate_Interview";
import Sidebar from "./components/Sidebar";

import Profile from "./components/Profile";
import ResumeReports from "./components/ResumeReports";
import HRResumeStatistics from "./components/HRResumeStatistics";
import Home from "./components/Home";
import BusinessRegistration from "./components/BusinessRegistration";
import StudentSignup from "./components/StudentSignup";

import { SidebarProvider } from "./auth/SidebarContext ";
import ProtectedRoute from "./auth/ProtectedRoute";
import Adminbusinessmsg from "./components/Adminbusinessmsg";


function App() {
  const { user } = useLogin();
  const [showSidebar, setShowSidebar] = useState(true);

  const noSidebarPages = ["/", "/login", "/candidate_interview", "/busines_register", "/Student_signup"];
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(!noSidebarPages.includes(location.pathname));
  }, [location.pathname]);

  return (
    <div className="App bg-black">
      <div className={`flex h-screen ${showSidebar ? 'flex' : ''}`}>
        {showSidebar && <Sidebar />}
        <div className={`flex-grow ${showSidebar ? 'ml-64' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Student_signup" element={<StudentSignup />} />
            <Route path="/busines_register" element={<BusinessRegistration />} />
            <Route path="/admin_business_msg" element={<Adminbusinessmsg />} />

            {/* Protected Routes wrapped with ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="/resume-result" element={<Resume_result />} />
              <Route path="/resume_upload" element={<ResumeUpload />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/result" element={<ResumeReports />} />
              <Route path="/adminpage" element={<Sidebar />} />
              <Route path="/selected_candidate" element={<SelectedCandidates />} />
              <Route path="/hr_Total_ResumeUploaded" element={<HRResumeStatistics />} />
            </Route>
            
            {/* Candidate Interview route */}
            <Route
              path="/candidate_interview"
              element={
                <Candidate_Interview
                  initialQuestion={{
                    id: 1,
                    text: "Can you tell me about yourself?",
                    totalQuestions: 5,
                    currentQuestion: 1
                  }}
                  onAnswerComplete={() => {}}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function RootApp() {
  return (
    <LoginProvider>
      <SidebarProvider>
        <Router>
          <App />
        </Router>
      </SidebarProvider>
    </LoginProvider>
  );
}

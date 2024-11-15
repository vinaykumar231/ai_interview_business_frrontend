import React, { useEffect, useState } from "react";
import "./App.css";
import { LoginProvider, useLogin } from "./auth/LoginContext";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Home";
import Login from "./auth/Login";
import Resume_result from "./components/Resume_result";
import Topbar from "./auth/Topbar";
import ResumeUpload from "./components/ResumeUpload";
import SelectedCandidates from "./components/SelectedCandidates";
import Candidate_Interview from "./components/Candidate_Interview";
import Sidebar from "./components/Sidebar";
import { SidebarProvider } from "./auth/SidebarContext ";
import Profile from "./components/Profile";
import ResumeReports from "./components/ResumeReports";

function App() {
  const { user } = useLogin();
  const questionNumber = 1;
  const totalQuestions = 5;
  const question = "What is your biggest strength?";
  const imageSources = ["AI-Video-Interviews.jpg", "inter.png"];

  function handleAnswerComplete(questionId: any, recordingBlob: any) {
    throw new Error("Function not implemented.");
  }

  const [showSidebar, setShowSidebar] = useState(true);
  

  // Correct placement of sidebar logic
  const noSidebarPages = ["/", "/login", "/candidate_interview"];
  const location = useLocation();
  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    // Update the sidebar visibility based on the current path
    setShowSidebar(!noSidebarPages.includes(location.pathname));
  }, [location.pathname]);

  return (
    <div className="App bg-black">
      <div className={`flex h-screen ${showSidebar ? 'flex' : ''}`}>
        {showSidebar && <Sidebar />}
        <div className={`flex-grow ${showSidebar ? 'ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume-result" element={<Resume_result />} />
            <Route path="/topbar" element={<Topbar />} />
            <Route path="/resume_upload" element={<ResumeUpload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/result" element={<ResumeReports />} />
            <Route path="/adminpage" element={<Sidebar />} />
            <Route path="/selected_candidate" element={<SelectedCandidates />} />
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
                  onAnswerComplete={handleAnswerComplete}
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

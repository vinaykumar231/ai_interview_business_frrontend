import React, { useState } from "react";
import { Brain, AlertCircle } from "lucide-react";
import { JobDescriptionInput } from "./JobDescriptionInput";
import { ResumeList } from "./ResumeList";
import { ResumeDropzone } from "./ResumeDropzone";
import Topbar from "../auth/Topbar";

interface Resume {
  id: string;
  name: string;
  size: number;
  status: "pending" | "analyzing" | "matched" | "rejected";
  matchScore?: number;
}

interface JobDescription {
  title: string;
  description: string;
}

function Resume_result() {
  const [jobDescription, setJobDescription] = useState<JobDescription>({
    title: "",
    description: "",
  });
  const [resumes, setResumes] = useState<Resume[]>([]);

  const isJobDescriptionValid:any =
    jobDescription.title.trim() && jobDescription.description.trim();

  const handleFilesDrop = (files: File[]) => {
    if (!isJobDescriptionValid) return;

    const newResumes: Resume[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "pending",
    }));

    setResumes((prev) => [...prev, ...newResumes]);

    // Simulate AI analysis
    newResumes.forEach((resume) => {
      setTimeout(() => {
        setResumes((prev) =>
          prev.map((r) =>
            r.id === resume.id ? { ...r, status: "analyzing" } : r
          )
        );

        setTimeout(() => {
          setResumes((prev) =>
            prev.map((r) =>
              r.id === resume.id
                ? {
                    ...r,
                    status: Math.random() > 0.3 ? "matched" : "rejected",
                    matchScore: Math.random() * 40 + 60,
                  }
                : r
            )
          );
        }, 2000);
      }, 1000);
    });
  };

  const handleRemoveResume = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

  return (
    <>
    <Topbar/>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              AI Resume Matcher
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Streamline your hiring process with AI-powered resume matching
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-4 left-4 px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
                Step 1
              </div>
              <JobDescriptionInput
                jobDescription={jobDescription.description}
                setJobDescription={(value) =>
                  setJobDescription((prev: any) => ({
                    ...prev,
                    description: value,
                  }))
                }
                jobTitle={jobDescription.title}
                setJobTitle={(value) =>
                  setJobDescription((prev: any) => ({ ...prev, title: value }))
                }
              />
            </div>

            <div className="relative">
              <div className="absolute -top-4 left-4 px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
                Step 2
              </div>
              <ResumeDropzone
                onFilesDrop={handleFilesDrop}
                isEnabled={isJobDescriptionValid}
              />
              {!isJobDescriptionValid && (
                <div className="mt-3 flex items-center gap-2 text-amber-600">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">
                    Please complete the job description first
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -top-4 left-4 px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
                Results
              </div>
              <ResumeList resumes={resumes} onRemove={handleRemoveResume} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Resume_result;

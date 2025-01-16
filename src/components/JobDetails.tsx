import React, { useEffect, useState } from "react";
import axios from "../helper/axios";
import { Eye, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface Job {
  id: string;
  hr_id: string;
  job_title: string;
  department: string;
  company_name: string;
  location: string;
  experience_required: string;
  salary_range: string;
  job_description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  status: "Draft" | "Published";
  application_deadline: string;
}

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null); // Initialize with null
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const getJobData = async () => {
      try {
        const response = await axios.get(`api/job_postings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data); // Ensure response.data matches your expected structure
        setJob(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getJobData();
  }, [id]);

  const navigate = useNavigate();

  const handleLog = () => {
    navigate("/Student_signup");
  };

  // const getJobData = async (id:any) => {
  //   try {
  //     const response = await axios.get(`api/job_postings/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(response.data); // Ensure response.data matches your expected structure
  //     setJob(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getJobData(id);
  // }, []);

  // Show a loading state or a fallback if the job is null
  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div
          key={job.id}
          className="bg-white rounded-lg shadow-lg p-6 m-7 flex items-center justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {job.job_title}
                </h2>
                <p className="text-gray-600">{job.department}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                {/* <Eye size={16} /> */}
                <span>
                  Deadline:{" "}
                  {new Date(job.application_deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="text-gray-600">
              <p>
                <strong>Company:</strong> {job.company_name}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Experience Required:</strong> {job.experience_required}
              </p>
              <p>
                <strong>Salary Range:</strong> {job.salary_range}
              </p>
            </div>
          </div>
          <div>
            <button
              className="bg-blue-600 text-white py-3 px-5 rounded-md hover:bg-blue-500"
              onClick={handleLog}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

import React, { useContext, useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Search,
  Eye,
  Save,
  AlertCircle,
  Linkedin,
  DeleteIcon,
  Share2,
  ClipboardList,
} from "lucide-react";
import axios from "../helper/axios";
import Swal from "sweetalert2";

// Enum definitions matching backend
const JobType = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
} as const;

const EmploymentType = {
  REMOTE: "Remote",
  ON_SITE: "On_site",
  HYBRID: "Hybrid",
} as const;

// TypeScript interfaces
interface JobPosting {
  id: string;
  hr_id: string;
  job_title: string;
  department: string;
  job_type: (typeof JobType)[keyof typeof JobType] | "";
  company_name: string;
  location: string;
  experience_required: string;
  employment_type: (typeof EmploymentType)[keyof typeof EmploymentType] | "";
  salary_range: string;
  job_description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  status: "Draft" | "Published";
  application_deadline: string;
}

const JobPost = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentJob, setCurrentJob] = useState<JobPosting | null>(null);
  const token = localStorage.getItem("token") || "";
  const user = localStorage.getItem("user");

  let userID;
  if (user) {
    // Parse the JSON string to an object
    const finalUser = JSON.parse(user);
    userID = finalUser?.user_id || "";
  }

  const defaultJob: JobPosting = {
    id: "",
    hr_id: userID,
    job_title: "",
    company_name: "",
    department: "",
    location: "",
    job_type: "",
    experience_required: "",
    employment_type: "",
    salary_range: "",
    job_description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    status: "Draft",
    application_deadline: new Date().toISOString().split("T")[0],
  };

  const handleCreateJob = () => {
    setCurrentJob(defaultJob);
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleEditJob = (job: JobPosting) => {
    setCurrentJob(job);
    setIsCreating(true);
    setIsEditing(true);
  };

  const getJobData = async () => {
    try {
      const response = await axios.get(`api/get_all_job_postings/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobData();
  }, []);

  const handleUpdateField = (field: keyof JobPosting, value: any) => {
    if (currentJob) {
      const formattedValue =
        field === "application_deadline" && value
          ? new Date(value).toISOString().split("T")[0] // Format as "YYYY-MM-DD"
          : value;

      setCurrentJob({ ...currentJob, [field]: formattedValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentJob) return;

    if (!currentJob.job_type || !currentJob.employment_type) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please select both Job Type and Employment Type",
      });
      return;
    }

    try {
      let response;
      if (isEditing) {
        // Update existing job
        response = await axios.patch(
          `api/job_postings/${currentJob.id}/`,
          currentJob,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create new job
        response = await axios.post(`api/job_postings/`, currentJob, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      Swal.fire({
        icon: "success",
        title: isEditing ? "Job Updated" : "Job Posted",
        text: isEditing
          ? "Your job has been updated successfully!"
          : "Your job has been posted successfully!",
      });

      // Refresh the jobs list
      getJobData();

      // Reset form state
      setIsCreating(false);
      setIsEditing(false);
      setCurrentJob(null);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.detail?.[0]?.msg || isEditing
            ? "Error updating job"
            : "Error posting job",
      });
      console.error(
        isEditing ? "Error updating job:" : "Error posting job:",
        error.response?.data
      );
    }
  };

  const handleCopyLink = (job: JobPosting) => {
    const jobLink = `${window.location.origin}/ai_hr/job_details/${job.id}`;
    navigator.clipboard
      .writeText(jobLink)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Link Copied",
          text: "The job posting link has been copied to your clipboard.",
        });
      })
      .catch((error) => {
        console.error("Error copying link:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the link.",
        });
      });
  };

  const handleDeleteJob = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        customClass: {
          icon: "swal-my-icon",
        },
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(`api/job_postings/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your announcement has been deleted.",
            icon: "success",
            customClass: {
              icon: "swal-my-icon",
            },
          });
          getJobData();
          setJobs(jobs.filter((job) => job.id !== id));
        } else {
          throw new Error("Failed to delete Content");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Your content was not deleted.",
        icon: "error",
        customClass: {
          icon: "swal-my-icon",
        },
        timer: 2000, // Timer in milliseconds (3000ms = 3 seconds)
        timerProgressBar: true, // Shows a progress bar for the timer
        showConfirmButton: false, // Optionally hide the confirm button
      });
    }
  };

  const handleShare = (job: JobPosting, platform: "whatsapp" | "linkedin") => {
    const jobUrl = `${window.location.origin}/ai_hr/job_details/${job.id}`;
    let shareLink = "";

    if (platform === "whatsapp") {
      // Include the job URL separately to ensure it is clickable
      const message = `Job Alert!\n\n${job.company_name} is hiring!\n\nRole: ${job.job_title}\nLocation: ${job.location}\nExperience: ${job.experience_required}\n\nApply now here:\n${jobUrl}`;

      // Encode the message for WhatsApp
      shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        message
      )}`;
    } else if (platform === "linkedin") {
      // Encode the job URL for LinkedIn
      shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        jobUrl
      )}`;
    }

    // Open the share link in a new tab
    window.open(shareLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Job Portal</h1>
          <p className="text-gray-600">Manage all job postings</p>
        </div>
        <button
          onClick={handleCreateJob}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Create New Job
        </button>
      </div>

      {/* Search and Filter */}
      {!isCreating && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="p-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      )}

      {/* Job Form */}
      {isCreating && currentJob && (
        <form action="" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {isCreating ? "Create New Job Posting" : "Edit Job Posting"}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                    setCurrentJob(null);
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-gray-700">
                  Job Title<span className="text-[red]">*</span>{" "}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.job_title}
                  onChange={(e) =>
                    handleUpdateField("job_title", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Job Description<span className="text-[red]">*</span>
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg h-32"
                  value={currentJob.job_description}
                  onChange={(e) =>
                    handleUpdateField("job_description", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Company Name<span className="text-[red]">*</span>
                </label>
                <input
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.company_name}
                  onChange={(e) =>
                    handleUpdateField("company_name", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Department<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.department}
                  onChange={(e) =>
                    handleUpdateField("department", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Location<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.location}
                  onChange={(e) =>
                    handleUpdateField("location", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Job Type<span className="text-[red]">*</span>
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.job_type}
                  onChange={(e) =>
                    handleUpdateField("job_type", e.target.value)
                  }
                  required
                >
                  <option value="">Select Job Type</option>
                  {Object.entries(JobType).map(([key, type]) => (
                    <option key={`job-type-${key}`} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Experience Required<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.experience_required}
                  onChange={(e) =>
                    handleUpdateField("experience_required", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Employment Type<span className="text-[red]">*</span>
                </label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.employment_type}
                  onChange={(e) =>
                    handleUpdateField("employment_type", e.target.value)
                  }
                  required
                >
                  <option value="">Select Employment Type</option>
                  {Object.entries(EmploymentType).map(([key, type]) => (
                    <option key={`employment-type-${key}`} value={type}>
                      {type.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Requirements<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.requirements}
                  onChange={(e) =>
                    handleUpdateField("requirements", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  Responsibilities<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.responsibilities}
                  onChange={(e) =>
                    handleUpdateField("responsibilities", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Salary Range<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.salary_range}
                  onChange={(e) =>
                    handleUpdateField("salary_range", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Benefits<span className="text-[red]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.benefits}
                  onChange={(e) =>
                    handleUpdateField("benefits", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">
                  Application Deadline<span className="text-[red]">*</span>
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                  value={currentJob?.application_deadline || ""} // Use empty string as fallback
                  onChange={(e) =>
                    handleUpdateField("application_deadline", e.target.value)
                  }
                  required
                />
              </div>

              {/* <div>
                <label className="block mb-2 text-gray-700">Status *</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={currentJob.status}
                  onChange={(e) => handleUpdateField('status', e.target.value as JobPosting['status'])}
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="closed">Closed</option>
                </select>
              </div> */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                  <Save size={20} />
                  {isEditing ? "Update Job" : "Save Job"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Job Listings */}
      {!isCreating && (
        <div className="grid grid-cols-1 gap-4">
          {jobs
            .filter(
              (job) =>
                (statusFilter === "all" || job.status === statusFilter) &&
                (job.job_title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                  job.department
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
            )
            .map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {job.job_title}
                    </h2>
                    <p className="text-gray-600">{job.department}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-center items-center">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit2 size={20} />
                      </button>

                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <DeleteIcon size={25} />
                      </button>
                      <button
                        onClick={() => handleCopyLink(job)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg flex justify-center items-center gap-3"
                        title="Copy"
                      >
                        {/* Copy Link */}
                        <ClipboardList size={20} />
                      </button>
                    </div>
                    {/* <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button> */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleShare(job, "whatsapp")}
                        className="text-green-500"
                      >
                        <Share2 /> {/* WhatsApp */}
                      </button>
                      <button
                        onClick={() => handleShare(job, "linkedin")}
                        className="text-blue-700"
                      >
                        <Linkedin /> {/* LinkedIn */}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <AlertCircle size={16} />
                    <span className="capitalize">{job.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye size={16} />
                    <span>
                      Deadline:{" "}
                      {new Date(job.application_deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default JobPost;

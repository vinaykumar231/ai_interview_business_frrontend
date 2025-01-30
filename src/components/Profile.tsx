import React, { useEffect, useState } from "react";
import axios from "../helper/axios"; // Ensure the correct path
import {
  Award,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Mail,
  Phone,
  UserCircle,
  UserCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

// Define the User interface based on API response structure
interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  user_type: string;
  company_name: string;
  industry: string;
  phone_no: string;
}

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

// Profile Component
const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [jobDataPost, setJobPostData] = useState({
    gender: "",
    date_of_birth: "",
    country: "",
    province_state: "",
    city: "",
    job_domain_function: "",
    job_sub_role: "",
    experience: "",
    total_experience_years: "",
    // total_experience_months: "",
    current_company_name: "",
    current_job_title: "",
    joining_date: "",
    current_ctc: "",
    expected_ctc: "",
    job_profile: "",
    notice_period: "",
    educations: [
      {
        degree: "",
        field_of_study: "",
        institution_name: "",
        year_of_passing: "",
      },
    ],
    projects: [
      {
        project_name: "",
        description: "",
        technologies_used: "",
      },
    ],
    certifications: [
      {
        certification_name: "",
        issued_by: "",
        issued_date: "",
      },
    ],
    job_details: [
      {
        job_title: "",
        company_name: "",
        job_duration_from: "",
        job_duration_to: "",
        job_skills: "",
        job_summary: "",
      },
    ],
  });
  // Retrieve the stringified "user" object from localStorage
  const user: any = localStorage.getItem("user");

  if (user) {
    try {
      // Parse the string into an object
      const parsedToken = JSON.parse(user);

      var token: any = parsedToken.token;

      // Access the user_id from the parsed object
      var candidate_id = parsedToken.user_id;
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  } else {
    console.log("No token found in localStorage");
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setJobPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);

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

  const handleNestedChange = (e: any, index: any, section: any) => {
    const { name, value } = e.target;

    setJobPostData((prevData: any) => ({
      ...prevData,
      [section]: prevData[section].map((item: any, idx: any) =>
        idx === index ? { ...item, [name]: value } : item
      ),
    }));
  };

  // Profile fetch Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("api/get_my_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`api/candidate_profiles`, jobDataPost, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Job Posted",
        text: "Your job has been posted successfully!",
      }).then(() => {
        window.location.reload();
      });
      console.log(response);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error posting job",
      });
      console.error("Error posting job:", error);
    }
  };

  const [submittedProfile, setSubmittedProfile] = useState(null);
  const [candidateData, setCandidateData] = useState<any | undefined>(
    undefined
  );

  // Add this useEffect to fetch the profile data
  useEffect(() => {
    const fetchSubmittedProfile = async () => {
      try {
        const response = await axios.get(
          `/api/candidate_profiles/${candidate_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubmittedProfile(response.data);
        setCandidateData(response.data);
        console.log(response?.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchSubmittedProfile();
  }, [token]);

  const addEducationField = () => {
    setJobPostData((prev: any) => ({
      ...prev,
      educations: [
        ...prev.educations,
        {
          degree: "",
          field_of_study: "",
          institution_name: "",
          year_of_passing: "",
        },
      ],
    }));
  };
  const addProjectField = () => {
    setJobPostData((prev: any) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          project_name: "",
          description: "",
          technologies_used: "",
        },
      ],
    }));
  };
  const addCertificateField = () => {
    setJobPostData((prev: any) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          certification_name: "",
          issued_by: "",
          issued_date: "",
        },
      ],
    }));
  };
  const addJobField = () => {
    setJobPostData((prev: any) => ({
      ...prev,
      job_details: [
        ...prev.job_details,
        {
          job_title: "",
          company_name: "",
          job_duration_from: "",
          job_duration_to: "",
          job_skills: "",
          job_summary: "",
        },
      ],
    }));
  };

  const removeJobField = (index: number) => {
    if (index === 0) return;
    setJobPostData((prevState) => ({
      ...prevState,
      job_details: prevState.job_details.filter((_, i) => i !== index),
    }));
  };

  const removeCertificateField = (index: any) => {
    if (index === 0) return;
    setJobPostData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const removeProjectField = (index: any) => {
    if (index === 0) return;
    setJobPostData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const removeEducationField = (index: any) => {
    if (index === 0) return;
    setJobPostData((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index),
    }));
  };

  const [isFresher, setIsFresher] = useState(false);

  const handleCheckbox  = (e:any) => {
    setIsFresher(e.target.checked);
  }

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {/* Main content */}

      {/* Show Profile while data was posted */}

      {/* Post Data  */}
      {profile?.user_type === "students" && (
        <div className="flex-1 p-4 md:p-8">
          <form action="" onSubmit={handleSubmit}>
            {/* Profile Section */}
            <div className="p-6 border-b">
              <div className="flex  justify-center items-center gap-6">
                <div className="relative mr-9">
                  {profile?.username ? (
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl font-bold">
                      {profile.username[0].toUpperCase()}
                    </div>
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="md:text-left">
                  <h2 className="text-xl font-semibold flex items-center gap-2 md:justify-start">
                    Welcome {profile?.username}{" "}
                  </h2>
                  <div className="mt-4 space-y-2">
                    <button className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone size={16} /> {profile?.phone_no}
                    </button>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Mail size={16} /> {profile?.email}
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Add resume
                    </button>
                  </div> */}
              </div>
            </div>

            {submittedProfile ? (
              <>
                <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
                  {/* Personal Info Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <UserCircle2 className="w-5 h-5" />
                      Personal Information
                    </h2>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Gender
                            </p>
                            <p className="mt-1">
                              {candidateData?.candidate_profile?.gender}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Date of Birth
                            </p>
                            <p className="mt-1">
                              {candidateData?.candidate_profile?.date_of_birth}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Location
                            </p>
                            <p className="mt-1">{`${candidateData?.candidate_profile?.city}, ${candidateData?.candidate_profile?.province_state}, ${candidateData?.candidate_profile?.country}`}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Total Experience
                            </p>
                            <p className="mt-1">
                              {
                                candidateData?.candidate_profile
                                  ?.total_experience_years
                              }{" "}
                              years
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Employment Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Current Employment
                    </h2>
                    <div className="space-y-6">
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Company
                            </p>
                            <p className="mt-1">
                              {
                                candidateData?.candidate_profile
                                  ?.current_company_name
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Job Title
                            </p>
                            <p className="mt-1">
                              {
                                candidateData?.candidate_profile
                                  ?.current_job_title
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Domain
                            </p>
                            <p className="mt-1">
                              {
                                candidateData?.candidate_profile
                                  ?.job_domain_function
                              }
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Role
                            </p>
                            <p className="mt-1">
                              {candidateData?.candidate_profile?.job_sub_role}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Current CTC
                            </p>
                            <p className="mt-1">
                              {candidateData?.candidate_profile?.current_ctc}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-600">
                              Expected CTC
                            </p>
                            <p className="mt-1">
                              {candidateData?.candidate_profile?.expected_ctc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </h2>
                    <div className="space-y-6">
                      {candidateData.educations.map((edu: any, index: any) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg bg-gray-50"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-600">
                                Degree
                              </p>
                              <p className="mt-1">{edu.degree}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-600">
                                Field of Study
                              </p>
                              <p className="mt-1">{edu.field_of_study}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-600">
                                Institution
                              </p>
                              <p className="mt-1">{edu.institution_name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-600">
                                Year of Passing
                              </p>
                              <p className="mt-1">{edu.year_of_passing}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FolderGit2 className="w-5 h-5" />
                      Projects
                    </h2>
                    <div className="space-y-6">
                      {candidateData.projects.map(
                        (project: any, index: any) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg bg-gray-50"
                          >
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-600">
                                  Project Name
                                </p>
                                <p className="mt-1">{project.project_name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600">
                                  Technologies Used
                                </p>
                                <p className="mt-1">
                                  {project.technologies_used}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600">
                                  Description
                                </p>
                                <p className="mt-1">{project.description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Certifications Section */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Certifications
                    </h2>
                    <div className="space-y-6">
                      {candidateData.certifications.map(
                        (cert: any, index: any) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg bg-gray-50"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-600">
                                  Certification Name
                                </p>
                                <p className="mt-1">
                                  {cert.certification_name}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600">
                                  Issued By
                                </p>
                                <p className="mt-1">{cert.issued_by}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-600">
                                  Issue Date
                                </p>
                                <p className="mt-1">{cert.issued_date}</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className=" mx-auto bg-white rounded-xl shadow-sm">
                  {/* Personal Details Section */}
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      Personal Details{" "}
                    </h3>

                    <div className="flex justify-between">
                      <div className="w-[48%]">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Gender*
                          </label>
                          <div className="flex gap-4 border-[1px] p-3 mb-5 rounded-lg text-[14px]">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={handleChange}
                                className="text-blue-600"
                                required
                              />
                              <span>Male</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={handleChange}
                                className="text-blue-600"
                                required
                              />
                              <span>Female</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="gender"
                                value="Other"
                                onChange={handleChange}
                                className="text-blue-600"
                                required
                              />
                              <span>Other</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 ">
                            Date of Birth*
                          </label>
                          <div className="border-[1px] p-3 mb-5 rounded-lg text-[14px]">
                            <input
                              type="date"
                              name="date_of_birth"
                              value={jobDataPost.date_of_birth}
                              onChange={handleChange}
                              className="w-full"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country*
                          </label>
                          <input
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={jobDataPost.country}
                            onChange={handleChange}
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                            required
                          />
                        </div>
                      </div>

                      <div className="w-[48%]">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Province/State*
                          </label>
                          <input
                            type="text"
                            placeholder="State"
                            name="province_state"
                            value={jobDataPost.province_state}
                            onChange={handleChange}
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            City*
                          </label>
                          <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={jobDataPost.city}
                            onChange={handleChange}
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Experience*
                          </label>
                          <input
                            type="text"
                            placeholder="numbers only"
                            name="total_experience_years"
                            value={jobDataPost.total_experience_years}
                            onChange={handleChange}
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                            required
                          />
                        </div>
                        {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Experience Mth*
                      </label>
                      <input
                        type="text"
                        placeholder="Total exp mth"
                        name="total_experience_months"
                        value={jobDataPost.total_experience_months}
                        onChange={handleChange}
                        className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                      />
                    </div> */}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-6 mt-6 ml-5">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" checked={isFresher} onChange={handleCheckbox}/>
                        <span className="text-sm font-medium text-gray-700">
                          I am a Fresher
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Current Company details */}
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      Current company details{" "}
                    </h3>

                    {/* <div className="flex justify-between"> */}
                    <div className="flex justify-between">
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job domain*
                        </label>
                        <input
                          type="text"
                          placeholder="Job domain"
                          name="job_domain_function"
                          value={jobDataPost.job_domain_function}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          required
                          disabled={isFresher}                        />
                      </div>

                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2 ">
                          Job Role*
                        </label>
                        <input
                          type="text"
                          placeholder="Job role"
                          name="job_sub_role"
                          value={jobDataPost.job_sub_role}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience*
                        </label>
                        <input
                          type="text"
                          placeholder="Current company exp"
                          name="experience"
                          value={jobDataPost.experience}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current company name*
                        </label>
                        <input
                          type="text"
                          placeholder="Company name"
                          name="current_company_name"
                          value={jobDataPost.current_company_name}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current job title*
                        </label>
                        <input
                          type="text"
                          placeholder="Title"
                          name="current_job_title"
                          value={jobDataPost.current_job_title}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Joining_date*
                        </label>
                        <input
                          type="date"
                          placeholder="Join Date"
                          name="joining_date"
                          value={jobDataPost.joining_date}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current ctc*
                        </label>
                        <input
                          type="text"
                          placeholder="Current ctc"
                          name="current_ctc"
                          value={jobDataPost.current_ctc}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>

                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected ctc*
                        </label>
                        <input
                          type="text"
                          placeholder="Expected ctc"
                          name="expected_ctc"
                          value={jobDataPost.expected_ctc}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job profile*
                        </label>
                        <input
                          type="text"
                          placeholder="Profile"
                          name="job_profile"
                          value={jobDataPost.job_profile}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>

                      <div className="w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notice period*
                        </label>
                        <input
                          type="text"
                          placeholder="Notice period"
                          name="notice_period"
                          value={jobDataPost.notice_period}
                          onChange={handleChange}
                          className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          required
                          disabled={isFresher} 
                        />
                      </div>
                    </div>
                    {/* </div> */}
                  </div>

                        {/* Previous company section */}
                        {jobDataPost.job_details.map((job: any, index: any) => (
                    <div className="p-6 ">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        Previous Company
                      </h3>

                      <div className="flex justify-between">
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job title
                          </label>
                          <input
                            type="text"
                            placeholder="Title"
                            name="job_title"
                            value={job.job_title}
                            disabled={isFresher} 
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "job_details")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          />
                        </div>

                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2 ">
                            Company name
                          </label>
                          <input
                            type="text"
                            placeholder="Company name"
                            name="company_name"
                            value={job.company_name}
                            disabled={isFresher} 
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "job_details")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Skills
                          </label>
                          <input
                            type="text"
                            placeholder="skills"
                            name="job_skills"
                            value={job.job_skills}
                            disabled={isFresher} 
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "job_details")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          />
                        </div>
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job summary
                          </label>
                          <input
                            type="text"
                            placeholder="summary"
                            name="job_summary"
                            value={job.job_summary}
                            disabled={isFresher} 
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "job_details")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job duration from
                          </label>
                          <input
                            type="date"
                            placeholder="City"
                            name="job_duration_from"
                            value={job.job_duration_from}
                            disabled={isFresher} 
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "job_details")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          />
                        </div>
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job duration to
                          </label>
                          <input
                            type="date"
                            placeholder="City"
                            name="job_duration_to"
                            value={job.job_duration_to}
                            disabled={isFresher} 
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "job_details")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        {index > 0 && (
                          <button
                            type="button"
                            className=" border-2 text-white bg-red-600 hover:bg-red-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg mr-4"
                            onClick={() => removeJobField(index)}
                          >
                            Remove
                          </button>
                        )}
                        {index === jobDataPost.job_details.length - 1 && (
                          <button
                            type="button"
                            className={`${isFresher ? "hover:bg-green-600 hover:shadow" : "hover:bg-green-500 hover:shadow-lg" } text-white border-2 bg-green-600  duration-150 transition-all  px-4 py-1 rounded-lg`}
                            onClick={addJobField}
                            disabled={isFresher}
                          >
                            Add More
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Education Section */}
                  {jobDataPost.educations.map((education: any, index: any) => (
                    <div className="p-6 border-b" key={index}>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        Education
                      </h3>
                      <div className="flex justify-between">
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Degree*
                          </label>
                          <input
                            type="text"
                            name="degree"
                            placeholder="degree"
                            value={education.degree}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "educations")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                            required
                          />
                        </div>
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Field of study*
                          </label>
                          <input
                            type="text"
                            placeholder="field"
                            name="field_of_study"
                            value={education.field_of_study}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "educations")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Institution Name*
                          </label>
                          <input
                            type="text"
                            placeholder="Name"
                            name="institution_name"
                            value={education.institution_name}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "educations")
                            }
                            className=" rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                            required
                          />
                        </div>
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year_of_passing*
                          </label>
                          <input
                            type="number"
                            placeholder="year"
                            name="year_of_passing"
                            value={education.year_of_passing}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "educations")
                            }
                            className="no-arrow rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                            required
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        {index > 0 && (
                          <button
                            type="button"
                            className=" border-2 text-white bg-red-600 hover:bg-red-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg mr-4"
                            onClick={() => removeEducationField(index)}
                          >
                            Remove
                          </button>
                        )}
                        {index === jobDataPost.educations.length - 1 && (
                          <button
                            type="button"
                            className="text-white border-2 bg-green-600 hover:bg-green-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg"
                            onClick={addEducationField}
                          >
                            Add More
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Project Section */}
                  {jobDataPost.projects.map((project: any, index: any) => (
                    <div className="p-6 border-b">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        Projects
                      </h3>
                      <div className="flex justify-between">
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Project name
                          </label>
                          <input
                            type="text"
                            placeholder="project name"
                            name="project_name"
                            value={project.project_name}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "projects")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                          />
                        </div>
                        <div className="w-[48%]">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Technologies
                          </label>
                          <input
                            type="text"
                            placeholder="technology"
                            name="technologies_used"
                            value={project.technologies_used}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "projects")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <input
                            type="text"
                            placeholder="description"
                            name="description"
                            value={project.description}
                            onChange={(e: any) =>
                              handleNestedChange(e, index, "projects")
                            }
                            className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        {index > 0 && (
                          <button
                            type="button"
                            className=" border-2 text-white bg-red-600 hover:bg-red-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg mr-4"
                            onClick={() => removeProjectField(index)}
                          >
                            Remove
                          </button>
                        )}
                        {index === jobDataPost.projects.length - 1 && (
                          <button
                            type="button"
                            className="text-white border-2 bg-green-600 hover:bg-green-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg"
                            onClick={addProjectField}
                          >
                            Add More
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Certification Section */}
                  {jobDataPost.certifications.map(
                    (certificate: any, index: any) => (
                      <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                          Certicate
                        </h3>
                        <div className="flex justify-between">
                          <div className="w-[48%]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Certification name
                            </label>
                            <input
                              type="text"
                              placeholder="name"
                              name="certification_name"
                              value={certificate.certification_name}
                              onChange={(e: any) =>
                                handleNestedChange(e, index, "certifications")
                              }
                              className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                            />
                          </div>
                          <div className="w-[48%]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Issued by
                            </label>
                            <input
                              type="text"
                              placeholder="issued by"
                              name="issued_by"
                              value={certificate.issued_by}
                              onChange={(e: any) =>
                                handleNestedChange(e, index, "certifications")
                              }
                              className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date of Completion
                            </label>
                            <input
                              type="date"
                              placeholder="Date completion"
                              name="issued_date"
                              value={certificate.issued_date}
                              onChange={(e: any) =>
                                handleNestedChange(e, index, "certifications")
                              }
                              className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                            />
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          {index > 0 && (
                            <button
                              type="button"
                              className=" border-2 text-white bg-red-600 hover:bg-red-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg mr-4"
                              onClick={() => removeCertificateField(index)}
                            >
                              Remove
                            </button>
                          )}
                          {index === jobDataPost.certifications.length - 1 && (
                            <button
                              type="button"
                              className="text-white border-2 bg-green-600 hover:bg-green-500 duration-150 transition-all hover:shadow-lg px-4 py-1 rounded-lg"
                              onClick={addCertificateField}
                            >
                              Add More
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  )}

            
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <button className="px-4 py-2 text-gray-600 border rounded-lg" type="button">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </form>
          {submittedProfile && (
            <>
              <div>
                <h2 className="text-[18px] font-semibold text-center mb-7">
                  Paste Your Job Link here
                </h2>
                <div className="flex w-full my-0 mx-auto justify-center">
                  <input
                    type="text"
                    className="p-5 border-[5px]  w-[80%] justify-center flex  rounded-lg "
                    placeholder="paste your link here"
                    name="jobLink"
                  />
                  <button
                    type="submit"
                    name="jobLink"
                    className="border-2 p-4 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-all duration-200"
                  >
                    Click
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {profile?.user_type !== "students" && (
        <>
          <div className="flex justify-center min-h-screen from-indigo-50 via-white to-cyan-50 h-44 bg-white">
            <div className="bg-white rounded-lg shadow-2xl p-8 h-fit mt-16 w-[30%]">
              <div className="flex justify-center">
                {/* Profile Avatar Placeholder */}
                <div>
                  <UserCircle className="rounded-full w-[70%] h-32 flex justify-center items-center text-4xl font-bold text-gray-700" />
                </div>
              </div>
              <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4 w-[90%]">
                {profile?.username}
              </h1>
              <p className="text-center text-lg text-gray-600 mb-6 w-[90%]">
                {profile?.user_type}
              </p>

              <div className="space-y-4">
                {/* Profile Info */}
                <div className="flex justify-between items-center">
                  <span className="text-[20px] font-medium text-gray-700">
                    Email:
                  </span>
                  <span className="text-[20px] text-gray-500 w-[70%]">
                    {profile?.email}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[20px] font-medium text-gray-700">
                    Phone:
                  </span>
                  <span className="text-[20px] text-gray-500 w-[70%]">
                    {profile?.phone_no}
                  </span>
                </div>
                {/* Conditionally render Company and Industry fields */}
                {profile?.user_type !== "students" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-[20px] font-medium text-gray-700">
                        Company:
                      </span>
                      <span className="text-[20px] text-gray-500 w-[70%]">
                        {profile?.company_name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[20px] font-medium text-gray-700">
                        Industry:
                      </span>
                      <span className="text-[20px] text-gray-500 w-[70%]">
                        {profile?.industry}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;

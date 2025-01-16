import React, { useEffect, useState } from "react";
import axios from "../helper/axios"; // Ensure the correct path
import {
  Camera,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  UserCircle,
} from "lucide-react";
import Swal from "sweetalert2";

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
    total_experience_months: "",
    current_company_name: "",
    current_job_title: "",
    joining_date: "",
    current_ctc: "",
    expected_ctc: "",
    job_profile: "",
    notice_period: "",
    educations: [],
    projects: [],
    certifications: [],
    job_details: [],
  });

  const educations = [
    {
      degree: "",
      field_of_study: "",
      institution_name: "",
      year_of_passing: "",
    },
  ];
  const projects = [
    {
      project_name: "",
      description: "",
      technologies_used: "",
    },
  ];
  const certifications = [
    {
      certification_name: "",
      issued_by: "",
      issued_date: "",
    },
  ];
  const job_details = [
    {
      job_title: "",
      company_name: "",
      job_duration_from: "",
      job_duration_to: "",
      job_skills: "",
      job_summary: "",
    },
  ];
  const token = localStorage.getItem("token");

  const handleChange = (e:any) => {
    const {name, value} = e.target;

    setJobPostData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  }

  const handleNestedChange = (e:any, index:any, section:any) => {
    const {name, value} = e.target;

    setJobPostData((prevData:any)=> ({
      ...prevData,
      [section]: prevData[section].map((item:any, idx:any)=> 
        idx === index ? {...item, [name]: value} : item
      )
    }))
  }

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
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error posting job",
      });
      console.error("Error posting job:", error);
    }
  };

  const addEducation = () => {

  }

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <>
      {/* Main content */}
      {profile?.user_type === "students" && (
        <div className="flex-1 p-4 md:p-8">
          <div className=" mx-auto bg-white rounded-xl shadow-sm">
            {/* Profile Section */}
            <div className="p-6 border-b">
              <div className="flex  md:flex-row items-center gap-6">
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
                <div className="flex-1 md:text-left">
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
                <div className="flex flex-col gap-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    Add resume
                  </button>
                </div>
              </div>
            </div>

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
                          className="text-blue-600"
                        />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          className="text-blue-600"
                        />
                        <span>Female</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          className="text-blue-600"
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
                      <input type="date" className="w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country*
                    </label>
                    <input
                      type="text"
                      placeholder="Country"
                      className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
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
                      className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City*
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Experience*
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                    />
                  </div>
                </div>
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
                    placeholder="Country"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>

                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2 ">
                    Job Role*
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
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
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current company name*
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
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
                    placeholder="City"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Joining_date*
                  </label>
                  <input
                    type="date"
                    placeholder="City"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
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
                    placeholder="State"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>

                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected ctc*
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
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
                    placeholder="State"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>

                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notice period*
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>
              </div>
              {/* </div> */}
            </div>

            {/* Education Section */}
            <div className="p-6 border-b">
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
                    placeholder="Education"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of study*
                  </label>
                  <input
                    type="text"
                    placeholder="Education"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
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
                    placeholder="Education"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year_of_passing*
                  </label>
                  <input
                    type="text"
                    placeholder="Education"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-[22px] border-[2px] px-4">+</button>
              </div>
            </div>

            {/* Project Section */}
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
                    placeholder="Current company exp"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technologies used
                  </label>
                  <input
                    type="text"
                    placeholder="State"
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
                    placeholder="City"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-[22px] border-[2px] px-4">+</button>
              </div>
            </div>

            {/* Certification Section */}
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
                    placeholder="Current company exp"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issued by
                  </label>
                  <input
                    type="text"
                    placeholder="State"
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
                    placeholder="City"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-[22px] border-[2px] px-4">+</button>
              </div>
            </div>

            {/* Employment section */}

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
                    placeholder="Country"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>

                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2 ">
                    Company name
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
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
                    placeholder="Current company exp"
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-2"
                  />
                </div>
                <div className="w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job summary
                  </label>
                  <input
                    type="text"
                    placeholder="State"
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
                    className="rounded-lg block  w-full text-sm font-medium border-gray-300 border-[1px] p-3 text-gray-700 mb-5 h-[47px]"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="text-[22px] border-[2px] px-4">+</button>
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button className="px-4 py-2 text-gray-600 border rounded-lg">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Save
                </button>
              </div>
            </div>
          </div>
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

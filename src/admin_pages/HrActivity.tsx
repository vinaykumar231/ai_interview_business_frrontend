import React, { useEffect, useState } from "react";
import axios from "../helper/axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Interface for Resume data to match API response
interface Resume {
    candidate_email: string;
    uploaded_at: string;
    hr_name: string;
    relevance: number;
    strengths: string[];
    skills_fit: number;
    weaknesses: string[];
    cultural_fit: number;
    overall_score: number;
    job_title: string;
    candidate_info: {
        name: string;
        email: string;
        phone: string;
    };
    recommendations: string[];
    experience_match: number;
    missing_elements: string[];
    resume_status: string;
}

// Interface for HR Statistics
interface HRStatistics {
    total_uploaded: number;
    total_selected: number;
    total_rejected: number;
    hr_name: string;
    hr_id: number;
}

interface UserDetails {
    user_id: number;
    username: string;
    email: string;
    user_type: string;
    phone_no: string;
}

const HRResumeStatistics: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [stats, setStats] = useState<HRStatistics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [selectedHRId, setSelectedHRId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"selected" | "rejected">("selected");
    const token = localStorage.getItem('token');

    // Fetch all HR users
    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('/api/get_all_users/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const hrAndAhrUsers = response.data.filter(
                (user: UserDetails) => user.user_type === "HR"
            );
            setUsers(hrAndAhrUsers);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch HR users');
        }
    };

    // Fetch HR statistics and resume data for selected HR
    const fetchData = async (user_id: number) => {
        setLoading(true);
        try {
            // Fetch HR statistics
            const statsResponse = await axios.get(`/api/Total_resumeUploaded_by_hr/`, {
                params: { hr_id: user_id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Fetch resume analysis report
            const resumesResponse = await axios.get(`/api/get_resumes_analysis_report/`, {
                params: { hr_id: user_id },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStats(statsResponse.data);
            setResumes(resumesResponse.data);
        } catch (err) {
            console.error('Error fetching resume data:', err);
            setError('Error fetching resume data');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all users on initial render
    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Fetch data when an HR is selected
    useEffect(() => {
        if (selectedHRId) {
            fetchData(selectedHRId);
        }
    }, [selectedHRId]);

    // Prepare data for bar chart
    const barChartData = [
        { name: "Uploaded", value: stats?.total_uploaded || 0, fill: "#0EA5E9" },
        { name: "Selected", value: stats?.total_selected || 0, fill: "#10B981" },
        { name: "Rejected", value: stats?.total_rejected || 0, fill: "#EF4444" },
    ];

    const filteredResumes = activeTab === "selected"
        ? resumes.filter((resume) => resume.resume_status === "resume selected")
        : resumes.filter((resume) => resume.resume_status !== "resume selected");

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto w-[100%]">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-900 to-blue-900 p-6">
                        <h1 className="text-3xl font-bold text-center text-white">HR Resume Analytics</h1>
                    </div>

                    <div className="p-6">
                        {/* HR Selection Dropdown */}
                        <div className="mb-6 max-w-md mx-auto">
                            <select
                                onChange={(e: any) => setSelectedHRId(e.target.value)}
                                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                            >
                                <option value="">Select HR</option>
                                {users.map((ele) => (
                                    <option key={ele.user_id} value={ele.user_id}>
                                        {ele.username}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Statistics Cards */}
                        {stats && (
                            <div className="gap-6 mb-8 flex ml-[28%]">
                                {barChartData.map((stat) => (
                                    <div
                                        key={stat.name}
                                        className="bg-white border-2 border-gray-100 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-600 mb-2">{stat.name} Resumes</h3>
                                        <p className="text-4xl font-bold" style={{ color: stat.fill }}>
                                            {stat.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bar Chart for HR Statistics */}
                        {/* {stats && (
                            <div className="mb-8">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={barChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="value" fill="#0EA5E9" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )} */}

                        {/* Resume Analysis Section */}
                        {selectedHRId && (
                            <div>
                                {/* Tab Buttons */}
                                <div className="flex justify-center space-x-4 mb-6">
                                    <button
                                        onClick={() => setActiveTab("selected")}
                                        className={`py-2 px-6 rounded-lg transition-all ${
                                            activeTab === "selected"
                                                ? "bg-blue-900 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        Selected Resumes
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("rejected")}
                                        className={`py-2 px-6 rounded-lg transition-all ${
                                            activeTab === "rejected"
                                                ? "bg-red-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                    >
                                        Rejected Resumes
                                    </button>
                                </div>

                                {/* Resume Table */}
                                {filteredResumes.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full bg-white border border-gray-200">
                                            <thead>
                                                <tr className="bg-gray-100 border-b">
                                                    <th className="p-4 text-left text-gray-600 font-semibold">Candidate Name</th>
                                                    <th className="p-4 text-left text-gray-600 font-semibold">Email</th>
                                                    <th className="p-4 text-left text-gray-600 font-semibold">Phone</th>
                                                    <th className="p-4 text-left text-gray-600 font-semibold">Status</th>
                                                    <th className="p-4 text-left text-gray-600 font-semibold">Job Title</th>
                                                    <th className="p-4 text-left text-gray-600 font-semibold">Uploaded At</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredResumes.map((resume, index) => (
                                                    <tr
                                                        key={index}
                                                        className="border-b hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="p-4">{resume.candidate_info.name}</td>
                                                        <td className="p-4">{resume.candidate_email}</td>
                                                        <td className="p-4">{resume.candidate_info.phone}</td>
                                                        <td className="p-4">
                                                            <span
                                                                className={
                                                                    resume.resume_status === "resume selected"
                                                                        ? "text-green-600 font-semibold"
                                                                        : "text-red-600 font-semibold"
                                                                }
                                                            >
                                                                {resume.resume_status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">{resume.job_title}</td>
                                                        <td className="p-4">
                                                            {new Date(resume.uploaded_at).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 mt-10">
                                        No resumes found for the selected tab
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HRResumeStatistics;

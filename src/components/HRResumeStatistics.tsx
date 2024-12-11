import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell as PieCell, Legend } from "recharts";
import axios from "../helper/axios";

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
    job_title:string;
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

const HRResumeStatistics: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [stats, setStats] = useState<HRStatistics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [active, setActive] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<"selected" | "rejected">("selected");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user data from local storage
                const hrData = localStorage.getItem("user");
                const parsedUser = hrData ? JSON.parse(hrData) : null;

                if (!parsedUser) {
                    throw new Error("User data not found");
                }

                // Fetch HR statistics
                const statsResponse = await axios.get(`/api/Total_resumeUploaded_by_hr/`, {
                    params: { hr_id: parsedUser.user_id },
                });

                // Fetch resume analysis report
                const resumesResponse = await axios.get(`/api/get_resumes_analysis_report/`, {
                    params: { hr_id: parsedUser.user_id },
                });

                setStats(statsResponse.data);
                setResumes(resumesResponse.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred while fetching data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                    <p className="text-gray-300 mt-4">Loading data...</p>
                </div>
            </div>
        );
    }

    // No data state
    if (!resumes.length || !stats) {
        return (
            <div className="bg-black text-gray-300 h-screen flex items-center justify-center">
                No data available
            </div>
        );
    }

    // Prepare data for charts
    const barChartData = [
        { name: "Uploaded", value: stats.total_uploaded || 0, fill: "#0EA5E9" },
        { name: "Selected", value: stats.total_selected || 0, fill: "#10B981" },
        { name: "Rejected", value: stats.total_rejected || 0, fill: "#EF4444" },
    ];

    const pieChartData = [...barChartData];

    const filteredResumes =
    activeTab === "selected"? resumes.filter((resume) => resume.resume_status === "resume selected"): resumes.filter((resume) => resume.resume_status !== "resume selected");

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-10">
                    HR Resume Analytics
                </h1>

                {/* HR Statistics Cards */}
                <div className="gap-16 mt-10 flex flex-wrap justify-center">
                    {barChartData.map((stat) => (
                        <div
                            key={stat.name}
                            className="bg-gray-900 rounded-xl p-6 text-center shadow-lg transform transition-all hover:scale-105 m-4"
                        >
                            <h3 className="text-xl font-semibold text-gray-300 mb-3">{stat.name} Resumes</h3>
                            <p className="text-4xl font-bold" style={{ color: stat.fill }}>
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid md:grid-cols-2 gap-10 mt-10">
                    {/* Bar Chart */}
                    <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">
                            Resume Statistics (Bar Chart)
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1F2937",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                    }}
                                    cursor={{ fill: "rgba(255,255,255,0.1)" }}
                                />
                                <Bar dataKey="value" barSize={50}>
                                    {barChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    {/* <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">
                            Resume Statistics (Pie Chart)
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {pieChartData.map((entry, index) => (
                                        <PieCell key={`pie-cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div> */}
                </div>
                

                {/* Resume Analysis Report Section */}
                <h2 className="text-2xl font-bold mb-4 mt-10">Resume Analysis Report</h2>
                <div className="flex justify-center space-x-4 mb-8">
                    <button
                        onClick={() => setActiveTab("selected")}
                        className={`py-2 px-6 rounded-lg ${
                            activeTab === "selected"
                                ? "bg-cyan-400 text-black font-semibold"
                                : "bg-gray-800 text-gray-300"
                        }`}
                    >
                        Selected Resumes
                    </button>
                    <button
                        onClick={() => setActiveTab("rejected")}
                        className={`py-2 px-6 rounded-lg ${
                            activeTab === "rejected"
                                ? "bg-red-400 text-black font-semibold"
                                : "bg-gray-800 text-gray-300"
                        }`}
                    >
                        Rejected Resumes
                    </button>
                </div>
                {filteredResumes.map((resume, index) => (
                    <div
                        key={index}
                        className={`resume-card p-4 rounded-lg mb-4 ${resume.resume_status === 'resume selected'
                            ? 'border-2 border-green-500'
                            : 'border-2 border-red-500'
                            }`}
                    >
                        {/* Always Visible Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                            <button
                            onClick={() => setActive(active === index ? null : index)}
                            className="bg-teal-900 hover:!bg-blue-900 text-white py-2 px-4 rounded-lg transition duration-300 text-white-A700 mt-4"
                        >
                            {active === index ? "Hide Details" : "Show Details"}
                        </button>
                                <h3 className="text-xl font-semibold text-cyan-400">
                                    {resume.candidate_info.name}
                                </h3>
                                <p><strong>Email:</strong> {resume.candidate_email}</p>
                                <p><strong>Phone:</strong> {resume.candidate_info.phone}</p>
                                <p><strong>Status:</strong>
                                    <span
                                        className={
                                            resume.resume_status === 'resume selected'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                        }
                                    >
                                        {resume.resume_status.toUpperCase()}
                                    </span>
                                </p>
                                <p><strong>Job Title:</strong> {resume.job_title}</p>
                                <p><strong>Uploaded At:</strong> {new Date(resume.uploaded_at).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Conditionally Rendered Details */}
                        {active === index && (
                            <div>
                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p><strong>Overall Score:</strong> {resume.overall_score}</p>
                                        <p><strong>Relevance:</strong> {resume.relevance}/10</p>
                                        <p><strong>Skills Fit:</strong> {resume.skills_fit}/10</p>
                                        <p><strong>Cultural Fit:</strong> {resume.cultural_fit}/10</p>
                                        
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <h4 className="font-semibold text-cyan-300">Strengths</h4>
                                        <ul className="list-disc pl-5 text-gray-300">
                                            {resume.strengths.map((strength, idx) => (
                                                <li key={idx}>{strength}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-cyan-300">Weaknesses</h4>
                                        <ul className="list-disc pl-5 text-gray-300">
                                            {resume.weaknesses.map((weakness, idx) => (
                                                <li key={idx}>{weakness}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-cyan-300">Recommendations</h4>
                                        <ul className="list-disc pl-5 text-gray-300">
                                            {resume.recommendations.map((recommendation, idx) => (
                                                <li key={idx}>{recommendation}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h4 className="font-semibold text-cyan-300">Missing Elements</h4>
                                    <ul className="list-disc pl-5 text-gray-300">
                                        {resume.missing_elements.map((element, idx) => (
                                            <li key={idx}>{element}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HRResumeStatistics;

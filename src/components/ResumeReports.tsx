import React, { useEffect, useState } from 'react';
import axios from '../helper/axios';
import { FaFilePdf, FaUser, FaVideo } from 'react-icons/fa';

// Define the interface for the API response
interface ResumeReport {
    Interview_report: string;
    resume: string;
    candidate_name: string | null;
    video_url: string | null;
    created_on: string;
}

const ResumeReports: React.FC = () => {
    const [resumeReports, setResumeReports] = useState<ResumeReport[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchResumeReports = async () => {
            try {
                const response = await axios.get('/api/resume_report_pdf/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setResumeReports(response.data);
                setLoading(false);
                console.log(response.data);
            } catch (err) {
                setLoading(false);
                setError('Error loading reports');
            }
        };

        fetchResumeReports();
    }, [token]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            {resumeReports.length > 0 ? (
                <div className="resume-reports-container p-6 bg-gray-900 text-white rounded-md">
                    <h1 className="text-3xl font-semibold mb-6 text-center">Resume Reports</h1>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-800 text-gray-400">
                                    <th className="py-2 px-4">Candidate Name</th>
                                    <th className="py-2 px-4">Created On</th>
                                    <th className="py-2 px-4">Interview Report</th>
                                    <th className="py-2 px-4">Resume</th>
                                    <th className="py-2 px-4">Video</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resumeReports.map((report, index) => {
                                    return (
                                        <tr key={index} className="hover:bg-gray-700">
                                            <td className="py-2 px-4 flex items-center">
                                                <FaUser className="text-white text-lg mr-2" />
                                                {report.candidate_name || 'Unknown Candidate'}
                                            </td>
                                            <td className="py-2 px-4 text-gray-300">{formatDate(report.created_on)}</td>
                                            <td className="py-2 px-4">
                                                <a
                                                    href={report.Interview_report}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-500 flex items-center"
                                                >
                                                    <FaFilePdf className="mr-2 text-red-500" /> View
                                                </a>
                                            </td>
                                            <td className="py-2 px-4">
                                                <a
                                                    href={report.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 hover:text-blue-500 flex items-center"
                                                >
                                                    <FaFilePdf className="mr-2 text-green-500" /> View
                                                </a>
                                            </td>
                                            <td className="py-2 px-4">
                                                {report.video_url ? (
                                                    <a
                                                        href={report.video_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-500 flex items-center"
                                                    >
                                                        <FaVideo className="mr-2 text-yellow-500" /> View
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500">No Video</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-white text-center mt-14">
                    <p>No data available</p>
                </div>
            )}
        </>
    );
};

export default ResumeReports;

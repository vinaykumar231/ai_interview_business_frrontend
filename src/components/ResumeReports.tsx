import React, { useEffect, useState } from 'react';
import axios from '../helper/axios';
import { FaFilePdf, FaUser ,FaVideo } from 'react-icons/fa';

// Define the interface for the API response
interface ResumeReport {
    Interview_report: string;
    resume: string;
    candidate_name: string | null;
    video_url: string | null;
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
            } catch (err) {
                
                setLoading(false);
            }
        };

        fetchResumeReports();
    }, [token]);

    if (loading) return <div>Loading...</div>;
   

    return (
        <>
        {resumeReports.length >0 ? (
             <div className="resume-reports-container p-6 bg-gray-900 text-white rounded-md">
             <h1 className="text-3xl font-semibold mb-6 text-center">Resume Reports</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {resumeReports.map((report, index) => (
                     <div key={index} className="resume-report-item p-5 bg-gray-800 rounded-md shadow-lg">
                         <div className="flex items-center mb-4">
                             <FaUser className="text-white text-2xl mr-3" />
                             <h2 className="text-xl font-semibold">{report.candidate_name || 'Unknown Candidate'}</h2>
                         </div>
                         <div className="flex flex-col space-y-2">
                             <div className="flex items-center">
                                 <FaFilePdf className="mr-2 text-red-500" />
                                 <a href={report.Interview_report} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                     View Interview Report
                                 </a>
                             </div>
                             <div className="flex items-center">
                                 <FaFilePdf className="mr-2 text-green-500" />
                                 <a href={report.resume} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                     View Resume
                                 </a>
                             </div>
                             {/* Conditionally render the video link if video_url is present */}
                             {report.video_url && (
                                 <div className="flex items-center">
                                     <FaVideo  className="mr-2 text-yellow-500" />
                                     <a href={report.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                         View Video
                                     </a>
                                 </div>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
         </div>
        ) :(
            <div className=' text-white text-center mt-14'> 
                <p> No data available</p>
                </div>
        )}
       
        </>
    );
};

export default ResumeReports;

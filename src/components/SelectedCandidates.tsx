import React, { useEffect, useState } from 'react';
import axios from '../helper/axios'; // Ensure the correct path to axios
import Swal from "sweetalert2";

import { User } from 'lucide-react';
import { useLogin } from '../auth/LoginContext';

// Define the Candidate interface based on the API response
interface Candidate {
    candidate_name: string;
    candidate_email: string;
    candidate_phone: string;
    candidate_overall_score: string;
    candidate_resume_selection_status: string;
    hr_name: string;
    hr_email: string;
    company_name: string;
    Job_Title: string;
}

// Props for CandidateRow Component
interface CandidateRowProps {
    candidate_name: string;
    candidate_email: string;
    candidate_phone: string;
    candidate_overall_score: string;
    candidate_resume_selection_status: string;
    hr_name: string;
    hr_email: string;
    company_name: string;
    Job_Title: string;
    onSendEmail: (email: string) => void; // Pass a function to handle the email sending
}

// CandidateRow Component
const CandidateRow: React.FC<CandidateRowProps> = ({
    candidate_name,
    candidate_email,
    candidate_phone,
    candidate_overall_score,
    candidate_resume_selection_status,
    hr_name,
    hr_email,
    company_name,
    Job_Title,
    onSendEmail, // Receive the email handler
}) => {
    const [sending, setSending] = useState<boolean>(false);
    const { user }: any = useLogin();
    const userData: any = JSON.parse(localStorage.getItem("user") || '{}');
    const token = localStorage.getItem('token');

    const handleSendEmail = async () => {
        setSending(true);
        await onSendEmail(candidate_email);
        setSending(false);
    };

    return (
        <div className="flex items-center px-3 py-2 bg-gray-800 border-b border-gray-700 text-white">
            <div className="w-1/6">{candidate_name}</div>
            <div className="w-1/6">{candidate_resume_selection_status}</div>
            <div className="w-1/6">{candidate_email}</div>
            <div className="w-1/6">{candidate_phone}</div>
            <div className="w-1/6">{candidate_overall_score}</div>
            <button
                onClick={handleSendEmail} // Trigger the email sending process
                className="w-1/6 px-3 py-2 bg-blue-500 text-white rounded-md"
                disabled={sending} 
            >
                {sending ? 'Sending...' : 'Send Email'}
            </button>
        </div>
    );
};

// SelectedCandidates Component
const SelectedCandidates: React.FC = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [statusMessage, setStatusMessage] = useState<string>(''); // To display status message after email
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch data from the backend API
        axios
            .get('/api/selected-resumes/',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                  },
            }) // Replace with your backend API URL
            .then((response) => {
                setCandidates(response.data);
            })
            .catch((error) => {
                console.error('Error fetching selected candidates:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts.

    const handleSendEmail = async (email: string) => {
        try {
            // Make the POST request to your backend API for sending the selection email
            const response = await axios.post('/api/send-selection-email/', null, {
                params: { send_to: email }, // Use params to send email as query param
            });

            // Check the response status and message
            const status = response.data.results[email]?.status;
            if (status === "Emails sent") {
                setStatusMessage('Email sent successfully!');
                Swal.fire({
                    title: "Email sent successfully!",
                    icon: "success",
                });

            } else {
                setStatusMessage('Failed to send email.');
            }
        } catch (error) {
            setStatusMessage('Error sending email.');
            console.error('Error sending email:', error);
        }
    };

    return (
        <main className="flex flex-col px-6 pt-8 pb-40 text-white bg-black max-md:px-5 max-md:pb-24">
            <h1 className="self-center text-3xl font-semibold">Selected Candidates</h1>
            <section className="flex flex-col mt-6 w-full bg-black rounded-xl shadow-lg">
                <header className="flex justify-between items-center py-2 text-xl text-white bg-gray-900 border-b border-gray-700">
                    <div className="w-1/6">Name</div>
                    <div className="w-1/6">Status</div>
                    <div className="w-1/6">Email</div>
                    <div className="w-1/6">Phone</div>
                    <div className="w-1/6">Score</div>
                    <div className="w-1/6">Action</div>
                </header>
                {candidates.map((candidate, index) => (
                    <CandidateRow
                        key={index}
                        {...candidate}
                        onSendEmail={handleSendEmail} // Pass the email handler
                    />
                ))}
            </section>
            {/* Display the status message */}
            {statusMessage && <div className="mt-4 text-center text-green-500">{statusMessage}</div>}
        </main>
    );
};

export default SelectedCandidates;

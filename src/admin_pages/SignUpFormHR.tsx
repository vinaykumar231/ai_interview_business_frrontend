import React, { useState } from 'react';
import axios from '../helper/axios'; // Ensure Axios is set up correctly in your project
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface UserData {
    user_name: string;
    user_email: string;
    user_password: string;
    company_name: string;
    industry: string;
    phone_no: string;
}

const SignUpFormHR: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        user_name: '',
        user_email: '',
        user_password: '',
        company_name: '',
        industry: '',
        phone_no: '',
    });
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure token exists
        if (!token) {
            Swal.fire({
                title: 'Error',
                text: 'Token not found. Please log in again.',
                icon: 'error',
            });
            return;
        }

        // Simple client-side validation (optional)
        if (!userData.user_name || !userData.user_email || !userData.user_password) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all required fields.',
                icon: 'error',
            });
            return;
        }

        try {
            const response = await axios.post(
                '/api/insert/ai_Interviewer_register/',
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: response.data.message,
                    icon: 'success',
                });
                // Optionally, redirect to a different page (e.g., login or dashboard)
                // window.location.href = '/login';
            }
            navigate("/all_users");
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.detail || 'An error occurred while registering.',
                icon: 'error',
            });
        }
    };

    const handleBackClick = () => {
        navigate(-1); // Navigate to the previous page
      };

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg mt-[10%]">
            <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-teal-900 hover:text-blue-900"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={userData.user_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        value={userData.user_email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="user_password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="user_password"
                        name="user_password"
                        value={userData.user_password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        id="company_name"
                        name="company_name"
                        value={userData.company_name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                    <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={userData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phone_no" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phone_no"
                        name="phone_no"
                        value={userData.phone_no}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUpFormHR;

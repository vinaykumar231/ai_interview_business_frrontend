import React, { useEffect, useState } from 'react';
import axios from '../helper/axios'; // Ensure the correct path
import { useLogin } from '../auth/LoginContext'; // Assuming you have a login context

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
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('api/get_my_profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch profile data.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) return <div className="text-center text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="flex justify-center  min-h-screen  from-indigo-50 via-white to-cyan-50 h-44 bg-white">
            <div className="bg-white rounded-lg shadow-2xl  p-8 h-fit mt-16 w-[50%]">
                <div className="flex justify-center mb-6">
                    {/* Profile Avatar Placeholder */}
                    <div className="rounded-full w-32 h-32 bg-gray-200 flex justify-center items-center text-4xl font-bold text-gray-700">
                        {profile?.username.charAt(0).toUpperCase()}
                    </div>
                </div>
                <h1 className="text-3xl font-semibold text-center text-gray-900 mb-4">{profile?.username}</h1>
                <p className="text-center text-lg text-gray-600 mb-6">{profile?.user_type}</p>
                
                <div className="space-y-4">
                    {/* Profile Info */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Email:</span>
                        <span className="text-sm text-gray-500">{profile?.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Phone:</span>
                        <span className="text-sm text-gray-500">{profile?.phone_no}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Company:</span>
                        <span className="text-sm text-gray-500">{profile?.company_name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Industry:</span>
                        <span className="text-sm text-gray-500">{profile?.industry}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

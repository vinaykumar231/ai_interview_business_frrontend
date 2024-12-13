import React, { useState, useEffect } from 'react';
import axios from '../helper/axios'; // Ensure Axios is set up correctly in your project
import { Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

interface User {
    user_id: number;
    username: string;
    email: string;
    user_type: string;
    phone_no: string;
    company: string;
    industry: string;
}

const AllUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const token = localStorage.getItem('token');
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [newUserType, setNewUserType] = useState<string>('');

    // Fetch data from the backend API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/get_all_users/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    // Format phone number
    const formatPhoneNumber = (phone: string) => {
        return `${phone}`;
    };

    // Handle User Type Update
    const handleUserTypeUpdate = async (userId: number, newUserType: string) => {
        if (!newUserType || userId === null) {
            return Swal.fire('Error', 'Please select a user and provide a user type', 'error');
        }

        try {
            const response = await axios.put('/api/update_user_type/',
                {
                    user_id: userId,
                    user_type: newUserType,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            Swal.fire('Success', response.data.message, 'success');
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.user_id === userId ? { ...user, user_type: newUserType } : user
                )
            );
            setNewUserType('');
            setSelectedUser(null);
        } catch (err) {
            Swal.fire('Error', 'Failed to update user type', 'error');
        }
    };

    // Handle Edit Button Click
    const handleEditClick = async (user: User) => {
        setSelectedUser(user.user_id);

        const { value: newUserType } = await Swal.fire({
            title: 'Update User Type',
            input: 'text',
            inputLabel: 'Enter new user type',
            inputValue: user.user_type,
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'User type is required';
                }
            },
        });

        if (newUserType) {
            setNewUserType(newUserType);
            handleUserTypeUpdate(user.user_id, newUserType);
        }
    };

    // Handle Delete User
    const handleDeleteUser = async (userId: number) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure?',
            text: 'This user will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await axios.delete(`/api/delete_user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                Swal.fire('Deleted!', response.data.message, 'success');
                setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
            } catch (err) {
                Swal.fire('Error', 'Failed to delete user', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="resume-reports-container  bg-white p-6 text-white rounded-md">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-900 text-white px-6 py-4 flex">
                    <h2 className="text-2xl font-bold">User List</h2>
                    <Link to="/hr_register" className="px-4 py-2 bg-white  text-black rounded-lg justify-end items-end ml-[80%]">
                        <b>Register HR</b>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User Type</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone No</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Industry</th>
                                <th className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.user_id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-blue-600 hover:underline">
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{user.user_type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{formatPhoneNumber(user.phone_no)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {user.company || "N/A"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {user.industry || "N/A"}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            className="px-4 py-2 bg-blue-900 text-white rounded-lg mr-2"
                                            onClick={() => handleEditClick(user)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                            onClick={() => handleDeleteUser(user.user_id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUsers;

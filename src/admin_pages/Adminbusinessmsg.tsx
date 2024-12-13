import React, { useEffect, useState } from 'react';
import axios from "../helper/axios";
import { Eye, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Define the Company type interface
interface Company {
  id: number;
  company_name: string;
  contact_person_name: string;
  business_email: string;
  phone_number: string;
  company_website: string;
  company_description: string;
  company_size: string;
  created_on: string;
  is_checked: boolean; // Add the is_checked field
}

const Adminbusinessmsg: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [expandedDescription, setExpandedDescription] = useState<Set<number>>(new Set()); // Track expanded descriptions
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch data from the backend API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/api/companies/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch companies');
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [token]);

  // Function to handle checking the message
  const handleCheckMessage = async (messageId: number) => {
    Swal.fire({
      title: 'Are you sure you want to check this message?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, check it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`/api/verify_material/${messageId}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
              company.id === messageId ? { ...company, is_checked: true } : company
            )
          );

          Swal.fire({
            title: 'Checked successfully!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          });
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update the message status. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#d33',
          });
          console.error('Error updating message:', error);
        }
      }
    });
  };

  const handleToggleDescription = (companyId: number) => {
    setExpandedDescription((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId); // Collapse the description
      } else {
        newSet.add(companyId); // Expand the description
      }
      return newSet;
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );


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

  const getShortDescription = (description: string) => {
    const words = description.split(' ');
    return words.slice(0, 10).join(' ') + (words.length > 10 ? '...' : '');
  };

  return (
    <div className="resume-reports-container  bg-white p-6 text-white rounded-md ">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-900 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Business Message</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Contact Person</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company Size</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Company Website</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created On</th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{company.company_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{company.contact_person_name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600 hover:underline">
                      <a href={`mailto:${company.business_email}`}>{company.business_email}</a>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{company.phone_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {company.company_size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {company.company_website}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-normal" style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                    <span className="text-sm text-gray-500">
                      {expandedDescription.has(company.id)
                        ? company.company_description
                        : getShortDescription(company.company_description)}
                    </span>
                    {company.company_description.split(' ').length > 10 && (
                      <button
                        className="text-blue-600 ml-2"
                        onClick={() => handleToggleDescription(company.id)}
                      >
                        {expandedDescription.has(company.id) ? 'Read Less' : 'Read More'}
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-gray-500">
                      {formatDate(company.created_on)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {!company.is_checked ? (
                      <button
                        className="px-4 py-2 bg-blue-900 text-white rounded-lg"
                        onClick={() => handleCheckMessage(company.id)}
                      >
                        Check
                      </button>
                    ) : (
                      <span className="px-4 py-2 text-green-600">Checked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminbusinessmsg;

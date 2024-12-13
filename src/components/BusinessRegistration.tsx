import React, { useState } from 'react';
import { Building2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../helper/axios";
import Swal from 'sweetalert2';

function BusinessRegistration() {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person_name: '',
    business_email: '',
    phone_number: '',
    company_description: '',
    company_website: '',
    company_size: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state on form submission
    setSuccessMessage(''); // Reset success message

    try {
      const response = await axios.post('/api/companies/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Assuming success if response status is 200 or 201
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Message Sent successfully!');
        console.log('Response:', response.data);
        
        Swal.fire({
          title: 'Message Sent successfully!',
          text: 'Your message has been sent successfully and is being processed. Kindly wait for further response.',
          icon: 'success',
          confirmButtonText: 'OK',
          
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });

      }
    } catch (err: any) {
      console.error('Error:', err);

      // Handle Axios error response
      if (err.response && err.response.status === 422) {
        // Handle validation errors
        const errorMessages = err.response.data.detail || [];
        setError(errorMessages.join(', ') || 'Validation failed.');
      } else {
        setError('Something went wrong, please try again later.');
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 rounded-full p-3">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Join Our Platform</h2>
          <p className="text-center text-gray-600 mb-8">
            Register your company to start finding the best talent through AI-powered interviews.
          </p>

          {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company_name"
                  id="companyName"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contact_person_name"
                  id="contactName"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.contact_person_name}
                  onChange={(e) => handleChange("contact_person_name", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Business Email *
                </label>
                <input
                  type="email"
                  name="business_email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.business_email}
                  onChange={(e) => handleChange("business_email", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone"
                  pattern="\d{10}" // Enforces exactly 10 digits
                  maxLength={10} // Limits the input to 10 digits
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  placeholder="Enter 10-digit phone number"
                />
              </div>


              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                  Company Website
                </label>
                <input
                  type="url"
                  name="company_website"
                  id="website"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.company_website}
                  onChange={(e) => handleChange("company_website", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Company Size *
                </label>
                <select
                  name="company_size"
                  id="size"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.company_size}
                  onChange={(e) => handleChange("company_size", e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Company Description *
              </label>
              <textarea
                name="company_description"
                id="description"
                required
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.company_description}
                onChange={(e) => handleChange("company_description", e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegistration;

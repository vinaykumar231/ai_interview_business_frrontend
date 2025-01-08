import React, { useState } from 'react';
import { Search, Briefcase, MapPin, Clock, Filter } from 'lucide-react';

// TypeScript interfaces
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
}

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Sample job data
  const jobs: Job[] = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Tech Corp",
      location: "New York, NY",
      type: "Full-time",
      salary: "$120k - $150k",
      posted: "2 days ago",
      description: "We're looking for an experienced React developer to join our team..."
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $100k",
      posted: "1 week ago",
      description: "Seeking a talented UX designer with 3+ years of experience..."
    },
    {
      id: 3,
      title: "Product Manager",
      company: "StartupCo",
      location: "San Francisco, CA",
      type: "Part-time",
      salary: "$90k - $110k",
      posted: "3 days ago",
      description: "Join our fast-growing startup as a product manager..."
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || job.type.toLowerCase() === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Discover opportunities that match your skills and aspirations</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs or companies..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Job Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <span className="text-lg font-semibold">{job.salary}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={16} />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{job.posted}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{job.description}</p>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobPortal;
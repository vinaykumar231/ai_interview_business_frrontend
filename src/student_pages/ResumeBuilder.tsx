import React from "react";

const ResumeTemplate = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-blue-50 min-h-screen flex flex-col items-center justify-center px-4">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center py-4 px-6 bg-white shadow-sm">
        <h1 className="text-lg font-bold text-gray-800 flex items-center">
          <span className="mr-2">
            {/* Logo */}
            <img
              src={`${process.env.PUBLIC_URL}/logo_maiteri_ai_rec.jpg`}
              alt="Logo"
              className="h-11"
            />
          </span>
          Resume Builder.
        </h1>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Contact Us
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Login
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mt-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Job-Winning Resume Templates
        </h2>
        <p className="text-gray-600 text-lg">
          Get the job 2x as fast. Choose from dozens of recruiter-approved
          templates. Click to add ready-to-use skills and phrases to your
          template.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium mt-6 hover:bg-blue-700">
          Choose a template
        </button>
      </div>

      {/* Image Section */}
      <div className="relative mt-10">
        {/* Resume Image */}
        <img
          src={`${process.env.PUBLIC_URL}/resume.png`}
          alt="Resume Template"
          className="max-w-md rounded-lg shadow-lg"
        />

        {/* Person Image */}
        <img
          src={`${process.env.PUBLIC_URL}/dev pic.jpg`}
          alt="Person"
          className="absolute bottom-0 right-[-50px] h-32 w-32 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>
    </div>
  );
};

export default ResumeTemplate;

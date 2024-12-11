import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, GraduationCap, CheckCircle } from 'lucide-react';
import VideoSection from './VideoSection';
import TestimonialSection from './TestimonialSection';
import StatisticsSection from './StatisticsSection';
import Footer from './Footer';

export default function LandingPage() {
  const features = [
    'AI-powered mock interviews',
    'Instant feedback and analysis',
    'Professional resume builder',
    'Interview preparation resources',
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl max-w-4xl mx-auto">
              Master Your Interview Skills with AI, Empowering Students and Businesses.
            </h1>

            <p className="mt-6 max-w-lg mx-auto text-xl text-blue-100">
              Practice interviews, build your resume, and improve your skills with our AI-powered platform.
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <Link
                to="/Student_signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
              >
                For Students
              </Link>
              <Link
                to="/busines_register"
                className="bg-blue-500 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-400 transition-colors"
              >
                For Businesses
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="gap-20 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
            <div className="p-8 px-32">
              <div className="bg-blue-600 rounded-full p-3 inline-block">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">For Students</h2>
              <ul className="mt-6 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/Student_signup"
                className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Start Practicing
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 px-32">
              <div className="bg-blue-600 rounded-full p-3 inline-block">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">For Organizations</h2>
              <ul className="mt-6 space-y-4">
                {[
                  'Automated screening process',
                  'Customizable interview questions',
                  'Detailed candidate analytics',
                  'Integration with ATS systems',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/busines_register"
                className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Join as Business
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <VideoSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
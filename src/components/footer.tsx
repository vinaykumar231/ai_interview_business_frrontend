import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-24">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900">AI Interview Platform</h3>
            <p className="mt-4 text-gray-600 max-w-md">
              Empowering students and businesses with AI-powered interview solutions. Practice, learn, and hire smarter.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">For Students</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="#" className="text-base text-gray-500 hover:text-gray-900">
                  Practice Interviews
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-500 hover:text-gray-900">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-500 hover:text-gray-900">
                  Learning Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">For Businesses</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/busines_register" className="text-base text-gray-500 hover:text-gray-900">
                  Join Platform
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-500 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-base text-gray-500 hover:text-gray-900">
                  Contact Sales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} AI Interview Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
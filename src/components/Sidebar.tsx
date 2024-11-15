import { Link } from 'react-router-dom';

import React, { useState, useEffect, MouseEvent } from 'react';
import { Users, User, ClipboardList, DollarSign, LogOut, BookOpen } from 'lucide-react';
import { useLogin } from '../auth/LoginContext';
import { useSidebar } from '../auth/SidebarContext ';

// Define a type for the user object
interface User {
  id: number;
  name: string;
  email: string;
  // Add other fields as per your user data structure
}

const Sidebar: React.FC = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const { logout } = useLogin(); // Use the useLogin hook to access logout function
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    // Fetch user data from localStorage or API
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout(); // Call the logout function from LoginContext
  };

  return (
    <>
    {isSidebarOpen &&(
     
        <aside className="fixed top-0 left-0 w-64 bg-blue-900 text-white flex flex-col h-screen overflow-y-auto">
          <div className="p-4 flex items-center space-x-4">
            
            <h1 className="text-xl font-bold">MaitriAI</h1>
          </div>
          <nav className="flex-grow mt-6">
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <Link to="/profile" className="block py-2.5 px-4 text-sm hover:bg-blue-700">
                  Profile
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <User className="w-6 h-6" />
                <Link to="/resume_upload" className="block py-2.5 px-4 text-sm hover:bg-blue-700">
                Resume Upload
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ClipboardList className="w-6 h-6" />
                <Link to="/selected_candidate" className="block py-2.5 px-4 text-sm hover:bg-blue-700">
                Selected Candidate
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <ClipboardList className="w-6 h-6" />
                <Link to="/result" className="block py-2.5 px-4 text-sm hover:bg-blue-700">
                Interview Report
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <LogOut className="w-6 h-6" />
                <Link to="/" className="block py-2.5 px-4 text-sm hover:bg-blue-700" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
          <div className="p-4">
            <a href="#" className="flex items-center space-x-2 py-2.5 px-4 text-sm hover:bg-blue-700">
              <BookOpen className="w-6 h-6" />
              <span>Knowledge Base</span>
            </a>
          </div>
        </aside>
       )}
    </>
  );
};

export default Sidebar;

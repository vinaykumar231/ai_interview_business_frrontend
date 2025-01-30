
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/logo_maiteri_ai_rec.jpg`}
                alt="Logo"
                className="h-16 w-16 rounded-full"
              />
              <span className="ml-2 text-2xl font-bold text-blue-900">Maitri AI.Interviewer</span>
            </Link>

          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
            <Link to="/busines_register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}


// Header
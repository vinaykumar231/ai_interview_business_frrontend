import React, { useState } from 'react';

type Service = 'Design Und Entwicklung' | 'Other Service';

const  ContactForm: React.FC = () => {
  const [service, setService] = useState<Service>('Design Und Entwicklung');

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-11">
      <h1 className="text-3xl font-bold mb-6">CONTACT US</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full bg-gray-700 rounded p-2"
        />
        <input
          type="email"
          placeholder="E-Mail"
          className="w-full bg-gray-700 rounded p-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full bg-gray-700 rounded p-2"
        />
        <div className="relative">
          <select
            value={service}
            onChange={(e) => setService(e.target.value as Service)}
            className="w-full bg-gray-700 rounded p-2 appearance-none"
          >
            <option>Design Und Entwicklung</option>
            <option>Other Service</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <textarea
          placeholder="Message"
          rows={4}
          className="w-full bg-gray-700 rounded p-2"
        ></textarea>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          SEND
        </button>
      </form>
      <div className="mt-8 relative">
        <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {/* World map placeholder */}
            <div className="w-full h-full bg-gray-600"></div>
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-700 p-2 rounded shadow-md">
            <h3 className="font-bold">INDIA</h3>
            <p className="text-sm">01578 4680672</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
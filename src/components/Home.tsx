import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LandingPage from './LandingPage';
import BusinessRegistration from './BusinessRegistration';

function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
        <Header />
       
          <LandingPage/>
          {/* <BusinessRegistration/> */}
        </div>
        </>
     
  );
}

export default Home;
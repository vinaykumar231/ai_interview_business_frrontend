import React from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  
  return (
    <main className="flex flex-col">
      <header className="flex relative flex-col justify-center items-start px-9 py-2.5 w-full min-h-[72px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-10 items-center justify-between w-full">
          <Logo />

          <ul className="text-white gap-7 flex justify-start">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div>
            <button className="text-white"><Link to="/login"> Login</Link></button>
          </div>
        </div>
      </header>
    </main>
  );
};

export default Header;

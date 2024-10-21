import React from "react";
import Logo from "./logo";

const Header: React.FC = () => {
  return (
    <main className="flex flex-col">
      <header className="flex relative flex-col justify-center items-start px-9 py-2.5 w-full min-h-[72px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e346de0a11bc2adda4b50968219a55c43e5ebbc147cba87e8a01e2a317b75f9e?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <Logo />
      </header>
    </main>
  );
};

export default Header;

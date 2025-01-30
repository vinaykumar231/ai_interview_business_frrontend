import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img src={`${process.env.PUBLIC_URL}/assets/images/maitri.png`} alt="Saturn" className="w-full h-auto z-10" />
    </div>
  );
};

export default Logo;

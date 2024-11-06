import React from 'react';

const ImageSection: React.FC = () => {
  return (
    <div className="relative flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
      {/* Blurry dot */}
      <div className="blurry-dot4"></div>

      {/* Image */}
      <img
        loading="lazy"
        src="/chart1.png"
        className="flex shrink-0 max-w-full rounded-none h-[634px] w-[847px] relative z-10" // z-index higher than blurry dot
      />
    </div>
  );
};

export default ImageSection;

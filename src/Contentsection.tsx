import React from 'react';

interface ContentSectionProps {
  title: string;
  description: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col w-[42%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-96 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start text-4xl font-extrabold tracking-tighter leading-none uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:max-w-full">
          {title}
        </h2>
        <p className="mt-9 text-base tracking-wide leading-6 text-white max-md:max-w-full">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ContentSection;
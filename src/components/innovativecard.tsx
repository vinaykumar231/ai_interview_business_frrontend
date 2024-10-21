import React from 'react';

interface InnovativeCardProps {
  title: string;
  description: string;
  additionalClasses?: string;
}

const InnovativeCard: React.FC<InnovativeCardProps> = ({ title, description, additionalClasses = '' }) => {
  return (
    <div className={`flex flex-col justify-center p-5 rounded-3xl bg-white bg-opacity-30 min-h-[117px] ${additionalClasses}`}>
      <h2 className="text-xl font-extrabold leading-10 uppercase">{title}</h2>
      <p className="self-start mt-1.5 text-sm tracking-wide leading-6 text-center">{description}</p>
    </div>
  );
};

export default InnovativeCard;
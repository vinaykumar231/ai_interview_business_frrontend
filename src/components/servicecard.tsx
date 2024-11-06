import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, color }) => {
  return (
    <div className="flex flex-col">
      <h3 className="self-start text-2xl font-semibold tracking-wide leading-none">{title}</h3>
      <p className="mt-7 text-base xl:text-[12px] tracking-wide leading-6">{description}</p>
      <div className={`flex shrink-0 self-end pb-[70px] -mt-16 ${color} h-[50px] w-[7px] max-md:mt-10`} />
    </div>
  );
};

export default ServiceCard;
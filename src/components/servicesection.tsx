import React from 'react';
import ServiceCard from './servicecard';

interface ServiceSectionProps {}

const ServiceSection: React.FC<ServiceSectionProps> = () => {
  const services = [
    { title: "Web design", description: "Our Team works best when it has a purpose that will create value. We create experiences that automate sell and are great to use", color: "bg-indigo-500" },
    { title: "Web development", description: "Our Team works best when it has a purpose that will create value. We create experiences that automate sell and are great to use", color: "bg-red-500" },
    { title: "Digital Marketing", description: "Our Team works best when it has a purpose that will create value. We create experiences that automate sell and are great to use", color: "" }
  ];

  return (
    <section className="grad-tab2 flex flex-col items-start self-center py-9 pr-20 mt-44 ml-5 w-full text-white rounded-3xl max-w-[2220px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex  gap-10 items-start text-4xl xl:text-[24px] font-extrabold leading-10 uppercase">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9f6ea2c4bed71451b6ef8c4cec03df509826a9f3938a1771414ecaff09e0415?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470" className="object-contain shrink-0 aspect-[0.99] w-[88px]" alt="" />
        <h2 className="flex-auto mt-2.5 max-md:max-w-full">
          We make your hiring process easier. Expertise, built-in.
        </h2>
      </div>
      <div className="flex  gap-5 justify-between mt-11 max-w-full w-[1184px] max-md:mt-10">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
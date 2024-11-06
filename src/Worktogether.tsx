import React from 'react';
import ContentSection from './Contentsection';
import ImageSection from './Imagesection';

interface WorkTogetherProps {
  title: string;
  description: string;
}

const WorkTogether: React.FC<WorkTogetherProps> = ({ title, description }) => {
  return (
    <section className="self-stretch pl-2 mt-32 max-md:mt-10 max-md:max-w-full bg-black">
      <div className="flex gap-5 max-md:flex-col px-20">
        <ContentSection title={title} description={description} />
        <ImageSection />
      </div>
    </section>
  );
};

export default WorkTogether;
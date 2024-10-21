import React from "react";
import TestimonialSection from './Testimonialsection';

const ComponentTwo: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col items-start px-20 py-40 bg-black max-md:px-5 max-md:py-24">
      <section className="flex flex-wrap gap-5 justify-between w-full font-extrabold max-w-[1638px] max-md:max-w-full">
        <div className="flex flex-col my-auto max-md:max-w-full">
          <h1 className="text-4xl tracking-tighter leading-10 uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:max-w-full">
            always on the lookout for the best techstack for youR business
          </h1>
          <p className="mt-9 text-base tracking-wide leading-6 text-white max-md:max-w-full">
            whether automation, ai-supported web development, 3d modeling or user experience design. we have made it our business to always operate at the cutting edge of technology.
          </p>
          <button className="gap-3.5 self-start px-16 py-2.5 mt-8 text-xl text-white uppercase rounded-3xl max-md:px-5">
            Lets work together
          </button>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/33b7d243e122b9d915b6043e33f5bd11b8fc1a1afcade306da90eb8e34aa036e?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470" className="object-contain shrink-0 max-w-full aspect-[0.49] w-[338px]" alt="Tech illustration" />
      </section>
      <h2 className="mt-24 text-4xl font-extrabold leading-tight uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:mt-10 max-md:max-w-full">
        See what our clients think
      </h2>
      <TestimonialSection />
      {/* <style jsx>{`
        builder-component {
          max-width: none !important;
        }
      `}</style> */}
    </main>
  );
};

export default ComponentTwo;
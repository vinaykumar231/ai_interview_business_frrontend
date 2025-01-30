import React from "react";
import TestimonialSection from "./Testimonialsection";

const ComponentTwo: React.FC = () => {
  return (
    <main className="flex overflow-hidden flex-col items-start px-20 py-40 bg-black max-md:px-5 max-md:py-24">
      <section className="flex  gap-5 justify-between w-full font-extrabold max-w-[1638px] max-md:max-w-full">
        <div className="flex w-[50%] flex-col my-auto max-md:max-w-full">
          <h1 className="grad-text text-4xl tracking-tighter leading-10 uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:max-w-full">
            always on the lookout for the best techstack for youR business
          </h1>
          <p className="mt-9 text-base xl:text-[13px] tracking-wide leading-6 text-white max-md:max-w-full">
            whether automation, ai-supported web development, 3d modeling or
            user experience design. we have made it our business to always
            operate at the cutting edge of technology.
          </p>
          <button className="grad-btn xl:w-[260px] gap-3.5 self-start px-16 xl:px-0 py-2.5 mt-8 text-xl text-white uppercase rounded-3xl max-md:px-5">
            Lets work together
          </button>
        </div>
        <div className="relative">
          {/* Blurry Dot Behind the Image */}
          <div className="blurry-dot1"></div>

          {/* Image */}
          <img
            loading="lazy"
            src={`${process.env.PUBLIC_URL}/assets/images/robo.png`}
            className="object-contain shrink-0 max-w-full aspect-[0.49] w-[338px] relative z-10"
            alt="Tech illustration"
          />
        </div>
      </section>
      <h2 className="grad-text mt-24 text-4xl font-extrabold leading-tight uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:mt-10 max-md:max-w-full">
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

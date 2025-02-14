import React from 'react';

interface MetricsSectionProps {}

const MetricsSection: React.FC<MetricsSectionProps> = () => {
  return (
    <section className="flex  gap-[150px] xl:gap-[30px] justify-between mt-48 w-full font-extrabold max-w-[1287px] max-md:mt-10 max-md:max-w-full">
      <div className="relative w-[50%] flex flex-col max-md:px-5 max-md:max-w-full">
    {/* Blurry Dot in the background */}
    <div className="blurry-dot2"></div>

    {/* Grad Tab (middle layer) */}
    <div className="grad-tab2 absolute top-0 left-0 w-full px-20 pt-8 pb-20 text-3xl leading-relaxed text-white uppercase rounded-3xl max-md:w-full z-10">
        <h2 className="self-start">convincing metrics</h2>
        <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4d36eadcb2b723a8f57faa65a0e12287b47c7e62ccbe6b89dc2353f234eafcc?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470" 
            className="object-contain mt-8 w-full rounded-none aspect-[1.96] max-md:max-w-full" 
            alt="Convincing metrics visualization" 
        />
    </div>
</div>

      <div className="w-[50%] flex flex-col items-start my-auto max-md:max-w-full">
        <h2 className="grad-text -mr-1 text-4xl tracking-tighter leading-10 uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:max-w-full">
          Don't settle for the candidates your competition rejected
        </h2>
        <p className="self-stretch mt-7 text-base xl:text-[13px] tracking-wide leading-6 text-white max-md:max-w-full">
          We will always go as far as we can to provide you the optimal ROI - by carefully analysing your target audience and goals
        </p>
        <button className="grad-btn gap-3.5 self-stretch px-16 py-2.5 mt-8 text-xl text-white uppercase rounded-3xl max-md:px-5">
          Lets work together
        </button>
      </div>
    </section>
  );
};

export default MetricsSection;
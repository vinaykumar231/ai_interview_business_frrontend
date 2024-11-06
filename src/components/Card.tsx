import React from "react";

const FinanceCard = () => {
  return (
    <>
      <h2 className="grad-text pl-28 mt-24 text-4xl font-extrabold leading-tight uppercase bg-clip-text bg-[linear-gradient(180deg,#F24E1E_0%,#A259FF_100%)] max-md:mt-10 max-md:max-w-full">
        Case studies
      </h2>
      <div className="w-full max-w-7xl mx-auto -p-8">
        <div className="grad-tab8 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - Image section */}
            <div className="lg:w-1/2   ">
              {/* Placeholder for image */}
              <div className="  rounded-xl overflow-hidden ">
                <img
                  src="/cardimg.png"
                  alt="Finance platform preview"
                  className="w-full h-full object-cover pt-[60px] pl-[40px]"
                />
              </div>
            </div>

            {/* Right side - Content section */}
            <div className="lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                RISE FINANCE CONCEPT
              </h2>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                Our Team Works Best When It Has A Purpose That Will Create
                Value. We Create Experiences That Automate Sell And Are Great To
                Use
              </p>

              <div className="mt-auto">
                <button
                  className="grad-btn text-white px-8 py-3 rounded-full 
                font-semibold transition-colors duration-300 text-lg">
                  VISIT PAGE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinanceCard;




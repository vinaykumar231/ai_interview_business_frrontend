import React from 'react';
import { Play } from 'lucide-react';

export default function VideoSection() {
  return (
    <section className="bg-blue-900 py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white sm:text-4xl">
        See How It Works
      </h2>
      <p className="mt-4 text-xl text-blue-100">
        Watch our platform in action
      </p>
    </div>

    <div className="mt-12 gap-20 flex items-center justify-center">
      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <div className="aspect-w-16 aspect-h-9">
          <video width="560" height="315" controls>
            <source src={`${process.env.PUBLIC_URL}/3209211-uhd_3840_2160_25fps.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-xl font-semibold text-white">For Students</h3>
          <p className="mt-2 text-blue-200">Learn how to ace your interviews</p>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-xl">
        <div className="aspect-w-16 aspect-h-9">
          <video width="560" height="315" controls>
            <source src={`${process.env.PUBLIC_URL}/3196292-uhd_3840_2160_25fps.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-xl font-semibold text-white">For Businesses</h3>
          <p className="mt-2 text-blue-200">Streamline your hiring process</p>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
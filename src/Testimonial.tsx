import React from 'react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, avatarSrc }) => (
  <div className="flex flex-col grow px-12 py-8 text-white rounded-3xl max-md:px-5 max-md:mt-7">
    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/18cac457ea685a743025d89265d06850bb5dab837f1c9be1e44cff3843dc471b?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470" className="object-contain aspect-[1.54] w-[43px]" alt="" />
    <p className="mt-8 text-lg tracking-wide leading-8">{quote}</p>
    <h3 className="mt-8 text-xl leading-relaxed">{name}</h3>
    <img loading="lazy" src={avatarSrc} className="object-contain mt-8 w-12 rounded-full aspect-square" alt={`${name}'s avatar`} />
    <p className="mt-8 text-base">{role}</p>
  </div>
);

export default Testimonial;
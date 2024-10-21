import React from 'react';
import Testimonial from './Testimonial';

const testimonials = [
  {
    quote: "Super creative and especially highly optimized website, thanks!",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dcb02cd48d635b130b76a62738d57f053e1d13d529610c12cbb888b3555a9ec?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
  },
  {
    quote: "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bccae0a9c4f594c68351de8ec1899ae4e07f41de497858e4483e602849a3f8ad?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
  },
  {
    quote: "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bccae0a9c4f594c68351de8ec1899ae4e07f41de497858e4483e602849a3f8ad?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
  },
  {
    quote: "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/bccae0a9c4f594c68351de8ec1899ae4e07f41de497858e4483e602849a3f8ad?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
  }
];

const TestimonialSection: React.FC = () => (
  <section className="self-center mt-14 w-full max-w-[1622px] max-md:mt-10 max-md:max-w-full">
    <div className="flex gap-5 max-md:flex-col">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
          <Testimonial {...testimonial} />
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialSection;
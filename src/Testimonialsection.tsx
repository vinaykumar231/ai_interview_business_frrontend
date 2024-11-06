import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import {Pagination} from "swiper/modules"

const testimonials = [
  {
    quote: "Super creative and especially highly optimized website, thanks!",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5dcb02cd48d635b130b76a62738d57f053e1d13d529610c12cbb888b3555a9ec?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470",
  },
  {
    quote:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bccae0a9c4f594c68351de8ec1899ae4e07f41de497858e4483e602849a3f8ad?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470",
  },
  {
    quote:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bccae0a9c4f594c68351de8ec1899ae4e07f41de497858e4483e602849a3f8ad?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470",
  },
  {
    quote:
      "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    role: "Founder & Leader",
    avatarSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/bccae0a9c4f594c68351de8ec1899ae4e07f41de497858e4483e602849a3f8ad?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470",
  },
];

const TestimonialSection: React.FC = () => (
  <section className="self-center mt-14 w-full max-w-[1622px] max-md:mt-10 max-md:max-w-full">
  <Swiper
    modules={[Pagination]}
    spaceBetween={20}
    pagination={{ clickable: true }}
    breakpoints={{
      1024: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    }}
    className="flex gap-5 max-md:flex-col"
  >
    {testimonials.map((testimonial, index) => (
      <SwiperSlide key={index}>
        <div className="flex grad-tab flex-col w-full">
          <div className="flex flex-col grow px-4 py-5 text-white rounded-3xl max-md:px-5 max-md:mt-7">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/18cac457ea685a743025d89265d06850bb5dab837f1c9be1e44cff3843dc471b?placeholderIfAbsent=true&apiKey=d0c2619e20f2401eac305ecc2228e470"
              className="object-contain aspect-[1.54] w-[43px]"
              alt=""
            />
            <p className="mt-8 text-lg tracking-wide leading-8">
              {testimonial.quote}
            </p>
            <h3 className="mt-8 text-xl leading-relaxed">{testimonial.name}</h3>
            <img
              loading="lazy"
              src={testimonial.avatarSrc}
              className="object-contain mt-8 w-12 rounded-full aspect-square"
              alt={`${testimonial.name}'s avatar`}
            />
            <p className="mt-8 text-base">{testimonial.role}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>
);

export default TestimonialSection;

import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Raj Trivedi",
      role: "Software Engineer",
      company: "Amazon",
      image: "raj pic.jpeg",
      content: "The AI interview practice helped me land my dream job. The feedback was incredibly detailed and helpful."
    },
    {
      name: "Dev chandan",
      role: "Product Manager",
      company: "Amazon",
      image: "dev pic.jpg",
      content: "This platform revolutionized our hiring process. We've saved countless hours and found better candidates."
    },
    {
      name: "Arya Kumar",
      role: "Recent Graduate",
      company: "university of mumbai",
      image: "arya pic.jpeg",
      content: "The resume builder and practice interviews gave me the confidence I needed for my job search."
    }
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600">Join thousands of satisfied users who've improved their interview skills</p>
        </div>

        <div className="mt-16  gap-8  flex">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-blue-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-gray-600 italic">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
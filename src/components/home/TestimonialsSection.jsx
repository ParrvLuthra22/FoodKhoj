import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sara Arora',
    role: 'Regular Customer',
    quote: 'Finally, a delivery app that actually shows where your food is! The estimated times are spot-on, and I love that I can directly contact my driver if I need to. Such a game-changer!',
    rating: 5,
    image: 'https://i.pinimg.com/736x/fa/42/12/fa42129314327568478005e455bc559d.jpg',
  },
  {
    id: 2,
    name: 'Aneesh Patil',
    role: 'Food Blogger',
    quote: 'As someone who orders food frequently, the accuracy of FoodKhoj\'s tracking is impressive. The ETA is always spot on!',
    rating: 5,
    image: 'https://i.pinimg.com/736x/e5/e3/ce/e5e3ced65b2ebd0486c40498a2af5e3f.jpg',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Busy Professional',
    quote: 'The live tracking feature lets me time my work breaks perfectly. I know exactly when to step away from my desk to receive my food.',
    rating: 4,
    image: 'https://i.pinimg.com/736x/46/95/25/4695257ca5ef1ef31b2a40d20f3047ec.jpg',
  },
];

function TestimonialsSection() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Thousands of hungry customers rely on FoodKhoj for their delivery tracking needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-6 flex flex-col">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating 
                        ? 'text-accent-500 fill-accent-500' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic flex-grow">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
import React from 'react';
import { Shield, Target, Heart, Users } from 'lucide-react';

function AboutPage() {
  const teamMembers = [
    {
    name: 'Parrv Luthra',
    role: 'Founder & CEO',
    bio: 'Former Google Maps engineer with a passion for food and technology.',
    image: 'https://i.pinimg.com/736x/a2/0c/41/a20c4157ac8cc7e84c9262555923e39c.jpg'
  },
  {
    name: 'Siya Kapoor',
    role: 'CTO',
    bio: 'Tech innovator with 15+ years of experience in location-based services.',
    image: 'https://i.pinimg.com/736x/35/b9/75/35b975625ea33670de9dfc152fec2e91.jpg'
  },
  {
    name: 'Aarav Singh',
    role: 'Head of Operations',
    bio: 'Restaurant industry veteran focused on creating seamless delivery experiences.',
    image: 'https://i.pinimg.com/736x/16/13/8c/16138c62e20e751a5a03be61aa29c971.jpg'
  },
  {
    name: 'Nia Sharma',
    role: 'Lead Designer',
    bio: 'Award-winning UX/UI designer dedicated to intuitive user experiences.',
    image: 'https://i.pinimg.com/736x/ca/ff/95/caff958c2022dce63d677fe2a1bef10f.jpg'
  }
  ];

  return (
    <div>
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-primary-500">FoodKhoj</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're revolutionizing food delivery with transparent, real-time tracking that keeps you connected to your order every step of the way.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                FoodKhoj was born out of frustration. Our founder, Parrv Luthra, was tired of the uncertainty that came with food delivery – never knowing when his food would arrive or where it was in the delivery process.
              </p>
              <p className="text-gray-700 mb-4">
                As a former Google Maps engineer, Parrv knew there had to be a better way. In 2024, he assembled a small team of food enthusiasts and tech innovators to create a platform that would bring transparency to food delivery.
              </p>
              <p className="text-gray-700">
                What started as a small project in a shared office space has grown into the leading food delivery tracking service, partnering with thousands of restaurants across the country to provide real-time delivery information to hungry customers.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-medium">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="FoodKhoj team working"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Mission & Vision</h2>
            <p className="section-subtitle mx-auto">
              We're driven by our commitment to transparency and innovation in food delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="bg-primary-500 w-14 h-14 rounded-full flex items-center justify-center text-white mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To eliminate uncertainty from food delivery by providing transparent, accurate, and reliable 
                tracking that keeps customers informed every step of the way. We believe that knowing exactly 
                when your food will arrive shouldn't be a luxury—it should be the standard.
              </p>
            </div>

            <div className="card p-8">
              <div className="bg-secondary-500 w-14 h-14 rounded-full flex items-center justify-center text-white mb-6">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To become the global standard for delivery tracking, powering transparent deliveries across 
                all industries. We envision a world where every delivery—whether it's food, packages, or 
                services—can be tracked in real-time, giving customers peace of mind and control over their schedule.
              </p>
            </div>
          </div>

          <div className="mt-12 card p-8">
            <div className="flex items-center mb-6">
              <div className="bg-accent-500 w-14 h-14 rounded-full flex items-center justify-center text-white mr-6">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold">Our Values</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-2 text-primary-500">Transparency</h4>
                <p className="text-gray-700">
                  We believe in complete openness with our customers, partners, and employees.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-secondary-500">Innovation</h4>
                <p className="text-gray-700">
                  We constantly push the boundaries of what's possible in delivery tracking technology.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-accent-500">Reliability</h4>
                <p className="text-gray-700">
                  Our customers and partners can count on our services to work flawlessly, every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle mx-auto">
              The passionate people behind FoodKhoj's tracking technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-500 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center bg-primary-500/10 rounded-full px-6 py-3 text-primary-600 font-medium">
              <Users className="h-5 w-5 mr-2" />
              Join Our Growing Team
            </div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation and excellent customer experiences.
              Check out our careers page for current openings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
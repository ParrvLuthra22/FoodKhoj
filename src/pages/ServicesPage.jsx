import React, { useState } from 'react';
import { Map, Truck as TruckDelivery, ThumbsUp, MessageSquare, ChevronDown, ChevronUp, Clock, Navigation, Bell } from 'lucide-react';

function ServicesPage() {
  const services = [
    {
      icon: <Map className="h-10 w-10" />,
      title: 'Real-Time Delivery Tracking',
      description: 'Track your food delivery in real-time on an interactive map, showing you exactly where your order is and when it will arrive.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      icon: <Bell className="h-10 w-10" />,
      title: 'Order Status Notifications',
      description: 'Receive instant notifications at every stage of your delivery, from order confirmation to when your food is at your doorstep.',
      image: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: 'Accurate Delivery ETAs',
      description: 'Know exactly when your food will arrive with our precise ETA calculations that account for traffic, distance, and preparation time.',
      image: 'https://images.pexels.com/photos/745365/pexels-photo-745365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How accurate is the delivery tracking?',
      answer: 'Our tracking system updates in real-time, providing location accuracy within a few meters. ETAs are typically accurate within a 3-5 minute window, accounting for traffic conditions and other variables.'
    },
    {
      question: 'Does FoodKhoj work with all food delivery services?',
      answer: 'FoodKhoj integrates with most major food delivery platforms and restaurant chains. We\'re constantly expanding our partnerships to ensure comprehensive coverage.'
    },
    {
      question: 'Can I share my tracking link with others?',
      answer: 'Yes! We make it easy to share your tracking link with friends, family, or colleagues so they can also monitor the delivery progress.'
    },
    {
      question: 'Is there a cost for using the tracking service?',
      answer: 'Basic tracking features are typically included with your food delivery at no additional cost. Premium features may be available as part of a subscription or loyalty program.'
    },
    {
      question: 'Does tracking work in rural areas?',
      answer: 'Yes, our tracking system works anywhere with cellular data coverage. In areas with spotty coverage, the location updates might be less frequent but will continue to function.'
    },
    {
      question: 'Can I communicate with my delivery driver through FoodKhoj?',
      answer: 'Yes, our platform includes a messaging feature that allows you to communicate directly with your delivery driver while maintaining privacy for both parties.'
    },
  ];

  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary-500">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how FoodKhoj's real-time tracking technology transforms the food delivery experience.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Delivery Tracking Services</h2>
            <p className="section-subtitle mx-auto">
              Our comprehensive tracking solutions keep you connected to your food order from kitchen to doorstep.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white mb-6 ${
                    index === 0 ? 'bg-primary-500' : index === 1 ? 'bg-secondary-500' : 'bg-accent-500'
                  }`}>
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {[
                      'Available 24/7 for all orders',
                      'Seamless integration with restaurants',
                      'Works on all devices and browsers',
                      'No app download required'
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <ThumbsUp className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-xl overflow-hidden shadow-medium">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle mx-auto">
              Our simple process ensures you're always in the loop with your food delivery.
            </p>
          </div>

          <div className="relative">
            {/* Process steps with connecting line */}
            <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 bg-primary-200 -translate-x-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="card p-6 text-center">
                <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <TruckDelivery className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Place Your Order</h3>
                <p className="text-gray-600">
                  Order your favorite food from any restaurant that partners with FoodKhoj's tracking system.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="bg-secondary-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <Navigation className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 bg-secondary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Receive Tracking Link</h3>
                <p className="text-gray-600">
                  Get a unique tracking link via SMS or email that gives you access to real-time delivery information.
                </p>
              </div>

              <div className="card p-6 text-center">
                <div className="bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <Map className="h-8 w-8" />
                  <span className="absolute -top-2 -right-2 bg-accent-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Track in Real-Time</h3>
                <p className="text-gray-600">
                  Watch as your delivery moves from the restaurant to your location with accurate ETAs and status updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">
              Get answers to common questions about our delivery tracking services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="card overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    {activeIndex === index ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-primary-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                    )}
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center justify-center bg-gray-100 rounded-full px-6 py-3">
              <MessageSquare className="h-5 w-5 text-primary-500 mr-2" />
              <span className="text-gray-700">Have more questions?</span>
            </div>
            <p className="mt-4 text-gray-600">
              Contact our support team for assistance with any questions not covered in our FAQ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
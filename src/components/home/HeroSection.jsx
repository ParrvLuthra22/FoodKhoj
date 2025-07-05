import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Order Food & <span className="text-primary-500">Track Delivery</span> in Real-Time
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Browse menus from local restaurants, place your order, and watch your food journey to your doorstep with live tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/restaurants" className="btn btn-primary text-base px-6 py-3">
                <MapPin className="mr-2 h-5 w-5" />
                Order Now
              </Link>
              <Link to="/services" className="btn btn-outline text-base px-6 py-3">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center">
                <div className="bg-secondary-500 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">30 min or less</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-accent-500 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Live Tracking</p>
                  <p className="text-sm text-gray-600">Real-time updates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-medium relative animate-float">
            <img
              src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Food delivery tracking"
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-soft px-4 py-2 flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

function InfoCard({ icon: Icon, title, subtitle, bgColor }: { icon: any; title: string; subtitle: string; bgColor: string }) {
  return (
    <div className="flex items-center">
      <div className={`p-2 rounded-full mr-3 ${bgColor}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Track Your Food <span className="text-primary-500">Delivery</span> in Real-Time
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Never wonder where your food is again. Get live updates, accurate ETAs, and watch your delivery journey in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/track"
                className="btn btn-primary inline-flex items-center justify-center text-base font-semibold px-6 py-3 rounded-lg"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Track Your Order
              </Link>
              <Link
                to="/services"
                className="btn btn-outline inline-flex items-center justify-center text-base font-semibold px-6 py-3 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-50"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <InfoCard icon={Clock} title="Fast Delivery" subtitle="30 min or less" bgColor="bg-secondary-500" />
              <InfoCard icon={MapPin} title="Live Tracking" subtitle="Real-time updates" bgColor="bg-accent-500" />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg animate-float">
            <img
              src="https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="A courier delivering food in real-time"
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-4 py-2 flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">Live Tracking</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;

import React from 'react';
import { MapPin, Clock, Bell, Activity, ShieldCheck, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Real-Time Tracking',
    description: 'Follow your food on an interactive map as it makes its way to your doorstep.',
    color: 'bg-primary-500',
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: 'Status Updates',
    description: 'Get instant notifications for each stage of your order — from confirmation to delivery.',
    color: 'bg-secondary-500',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Accurate ETAs',
    description: 'Know exactly when your meal will arrive with real-time estimated delivery times.',
    color: 'bg-accent-500',
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: 'Delivery Analytics',
    description: 'Track your delivery history and analyze patterns to optimize future orders.',
    color: 'bg-success-500',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Secure Tracking',
    description: 'Your order information is encrypted and protected with advanced security measures.',
    color: 'bg-warning-500',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: 'Mobile Friendly',
    description: 'Track your orders on any device with our responsive design optimized for all screens.',
    color: 'bg-error-500',
  },
];

function FeatureHighlights() {
  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Why Choose FoodKhoj</h2>
          <p className="section-subtitle mx-auto">
            Our advanced tracking system provides a seamless experience from order to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-6 transition-transform hover:-translate-y-1 duration-300"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureHighlights;
import React, { useState } from 'react';
import { Search, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MapComponent from '../shared/MapComponent';

function TrackingPreview() {
  const [orderId, setOrderId] = useState('');

  const handleTrackOrder = (e) => {
    e.preventDefault();
    console.log('Tracking order:', orderId);
  };

  const deliveryStatus = 'on the way';
  const estimatedTime = '15-20 min';
  const distance = '2.5 km away';

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Real-Time Order Tracking</h2>
          <p className="section-subtitle mx-auto">
            Watch your food's journey from restaurant to your doorstep with our advanced GPS tracking system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="card p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Track Your Order</h3>
              <p className="text-gray-600">
                Enter your order ID to see real-time location and status updates.
              </p>
            </div>

            <form onSubmit={handleTrackOrder} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your order ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full mt-3"
              >
                Track Now
              </button>
            </form>

            <div className="border-t border-gray-100 pt-6">
              <h4 className="font-medium mb-4 text-gray-900">Sample Order Status</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-primary-500 p-2 rounded-full mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Status: <span className="text-primary-500">{deliveryStatus}</span></p>
                    <p className="text-sm text-gray-600">{distance}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-secondary-500 p-2 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Estimated Arrival</p>
                    <p className="text-sm text-gray-600">{estimatedTime}</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/services" 
                className="flex items-center justify-center text-primary-500 font-medium mt-6 hover:text-primary-600 transition-colors"
              >
                Learn more about our tracking service
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="card overflow-hidden">
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrackingPreview;
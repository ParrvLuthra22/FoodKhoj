import React, { useState } from 'react';
import { Search, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MapComponent from '../shared/MapComponent';

function TrackingPreview() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const navigate = useNavigate();

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    // Check if order exists in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '{}');
    const orderData = orders[orderId.toUpperCase()];
    
    if (orderData) {
      // Order found - show live tracking
      setTrackingData(orderData);
      setIsTracking(true);
    } else {
      // Order not found - navigate to tracking page
      navigate(`/track?id=${orderId.toUpperCase()}`);
    }
  };

  const handleViewFullTracking = () => {
    navigate(`/track?id=${orderId.toUpperCase()}`);
  };

  const createDemoOrder = () => {
    const demoOrderId = 'DEMO123';
    const demoOrder = {
      id: demoOrderId,
      restaurant: {
        id: 'demo-restaurant',
        name: 'Pizza Palace'
      },
      items: [
        { id: 1, name: 'Margherita Pizza', quantity: 1, price: 12.99, priceINR: '₹999' }
      ],
      total: 15.99,
      totalINR: '₹1249',
      deliveryAddress: {
        street: '123 Demo Street',
        city: 'Demo City',
        zipCode: '12345',
        instructions: 'Ring the bell'
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
      driver: {
        name: 'Alex Johnson',
        phone: '+91 98765 43210',
        vehicle: 'Honda Bike',
        rating: 4.8
      },
      customerName: 'Demo User',
      customerEmail: 'demo@example.com',
      customerPhone: '+91 98765 43210'
    };

    // Store in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    existingOrders[demoOrderId] = demoOrder;
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Set the order ID in the input
    setOrderId(demoOrderId);
    
    alert('Demo order created! Click "Track Now" to see live tracking.');
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
            <div className="mb-6 text-center lg:text-left">
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
              <button
                type="button"
                onClick={createDemoOrder}
                className="btn btn-secondary w-full mt-2 text-sm"
              >
                📄 Create Demo Order (for testing)
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
                className="flex items-center justify-center lg:justify-start text-primary-500 font-medium mt-6 hover:text-primary-600 transition-colors"
              >
                Learn more about our tracking service
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="card overflow-hidden">
            {isTracking && trackingData ? (
              <div>
                <div className="p-4 bg-blue-50 border-b border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-blue-900">Tracking: {orderId.toUpperCase()}</h4>
                      <p className="text-sm text-blue-700">{trackingData.restaurant?.name || 'Restaurant'}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleViewFullTracking}
                        className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                      >
                        Full View
                      </button>
                      <button
                        onClick={() => {
                          setIsTracking(false);
                          setTrackingData(null);
                          setOrderId('');
                        }}
                        className="text-xs bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                <MapComponent isActive={true} orderData={trackingData} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-[350px] bg-gray-50">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Live Delivery Map</h4>
                  <p className="text-gray-500 mb-4">Enter a tracking ID above to see real-time delivery tracking</p>
                  <div className="text-xs text-gray-400">
                    <p>🚛 Real-time GPS tracking</p>
                    <p>📱 Live driver updates</p>
                    <p>⏱️ Accurate ETA</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrackingPreview;
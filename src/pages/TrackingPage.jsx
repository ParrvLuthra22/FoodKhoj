import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, User, Phone, MessageCircle, Navigation, CheckCircle } from 'lucide-react';

function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);

  const mockDeliveryData = {
    'FD12345': {
      restaurant: 'Billus Hut',
      items: ['White Sauce Pasta', 'Caesar Salad'],
      total: 24.99,
      address: '213 NSP, Pitampura, New Delhi, Delhi 110034',
      driver: {
        name: 'Parrv Luthra',
        phone: '+91 97283 23123',
        eta: '15-20 min',
        vehicle: 'Porsche 911 Carrera',
        rating: 5
      },
      estimatedTime: 10, 
      mapImage: 'https://c.ndtvimg.com/2024-07/aa1m7sag_swiggy-order-tracking-screen-shows-agent-followed-by-ghost-internet-reacts_625x300_15_July_24.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675'
    },
    'FD12346': {
      restaurant: 'Kings Kitchen',
      items: ['Sweet & Sour Chicken', 'Fried Rice'],
      total: 18.50,
      address: '432 Andheri East, Bandra, Mumbai, Maharastra 11201',
      driver: {
        name: 'Aayrish Singh',
        phone: '+91 93234 23123',
        vehicle: 'Ferrari 250 GTO',
        rating: 4.9
      },
      estimatedTime: 8,
      mapImage: 'https://images.hindustantimes.com/img/2022/08/24/1600x900/house-of-the-dragon-swiggy-replaces-motorbike-with-dragon-icon_1661350731957_1661350761704_1661350761704.jpg'
    },
    'FD12347': {
      restaurant: 'Burger King',
      items: ['Classic Burger', 'Fries', 'Milkshake'],
      total: 15.75,
      address: '789 peeragarhi, rohtak road, new delhi, Delhi 110043',
      driver: {
        name: 'Aayushman Sharma',
        phone: '+91 96437 09323',
        vehicle: 'Ford Focus - DEF 456',
        rating: 4.7
      },
      estimatedTime: 12,
      mapImage: 'https://img-cdn.publive.online/fit-in/1200x675/afaqs/media/post_attachments/4213b2556bf6e008b6b6ccd3483180569c5242ed74e2357d3a43d7a4dae2adeb.jpg'
    }
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    
    setTimeout(() => {
      const data = mockDeliveryData[orderId.toUpperCase()];
      if (data) {
        setTrackingData(data);
        setTimeRemaining(data.estimatedTime * 60); 
        setIsDelivered(false);
      } else {
        setTrackingData(null);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (timeRemaining > 0 && !isDelivered) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsDelivered(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, isDelivered]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRandomDriverLocation = () => {
    const locations = [
      'Currently at Main Street intersection',
      'Heading north on Oak Avenue',
      'Turning onto your street',
      'Approaching your building',
      'Looking for parking'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>
          
          <div className="card p-6 mb-8">
            <form onSubmit={handleTrackOrder} className="max-w-md mx-auto">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Enter your order ID (e.g., FD12345)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Try these sample order IDs:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(mockDeliveryData).map(id => (
                  <button
                    key={id}
                    onClick={() => setOrderId(id)}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {trackingData === null && !loading && orderId && (
            <div className="card p-8 text-center">
              <div className="text-red-500 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Order Not Found</h3>
              <p className="text-gray-600">
                We couldn't find an order with ID "{orderId}". Please check your order ID and try again.
              </p>
            </div>
          )}

          {trackingData && (
            <div className="space-y-6">
              <div className="card p-6">
                <div className="text-center mb-6">
                  {isDelivered ? (
                    <div className="text-green-500">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-green-600 mb-2">Delivered!</h2>
                      <p className="text-gray-600">Your order has been successfully delivered</p>
                    </div>
                  ) : (
                    <div className="text-primary-500">
                      <Clock className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">
                        Delivery in {formatTime(timeRemaining)}
                      </h2>
                      <p className="text-gray-600">Your order is on the way!</p>
                    </div>
                  )}
                </div>

                {!isDelivered && (
                  <div className="bg-primary-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary-500 mb-2">
                          {formatTime(timeRemaining)}
                        </div>
                        <p className="text-sm text-gray-600">Estimated delivery time</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Order Details</h3>
                    <p className="text-gray-600 mb-1">Order ID: {orderId}</p>
                    <p className="text-gray-600 mb-1">Restaurant: {trackingData.restaurant}</p>
                    <p className="text-gray-600 mb-1">Items: {trackingData.items.join(', ')}</p>
                    <p className="text-gray-600">Total: ${trackingData.total}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <p className="text-gray-600">{trackingData.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card overflow-hidden">
                <div className="relative">
                  <img
                    src={trackingData.mapImage}
                    alt="Delivery location map"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-white rounded-lg p-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-primary-500 rounded-full p-2 mr-3">
                            <Navigation className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Driver Location</p>
                            <p className="text-xs text-gray-600">{getRandomDriverLocation()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-xs text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                            <span>Live</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 right-8">
                    <div className="bg-red-500 rounded-full p-3 shadow-lg animate-bounce">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Your Driver</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold mr-4">
                      {trackingData.driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{trackingData.driver.name}</p>
                      <p className="text-sm text-gray-600">{trackingData.driver.vehicle}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{trackingData.driver.rating} rating</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                    <a
                      href={`tel:${trackingData.driver.phone}`}
                      className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Delivery Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full p-2 mr-4">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-600">Restaurant received your order</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full p-2 mr-4">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Food Prepared</p>
                      <p className="text-sm text-gray-600">Your order is ready</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-4 ${isDelivered ? 'bg-green-500' : 'bg-primary-500'}`}>
                      {isDelivered ? (
                        <CheckCircle className="h-4 w-4 text-white" />
                      ) : (
                        <Navigation className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {isDelivered ? 'Delivered' : 'Out for Delivery'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {isDelivered ? 'Order has been delivered' : 'Driver is on the way'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
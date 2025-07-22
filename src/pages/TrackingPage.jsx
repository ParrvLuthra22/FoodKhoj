import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, User, Phone, MessageCircle, Navigation, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ChatModal from '../components/chat/ChatModal';

function TrackingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const trackingIdFromUrl = urlParams.get('id');
    if (trackingIdFromUrl) {
      setOrderId(trackingIdFromUrl);
      handleTrackOrderById(trackingIdFromUrl);
    }
  }, [location]);

  const handleTrackOrderById = async (trackingId) => {
    setLoading(true);
    
    try {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '{}');
      const data = existingOrders[trackingId];
      
      if (data) {
        setTrackingData(data);
        
        const estimatedDelivery = new Date(data.estimatedDelivery);
        const now = new Date();
        const timeDiff = Math.max(0, Math.floor((estimatedDelivery - now) / 1000));
        setTimeRemaining(timeDiff);
        setIsDelivered(false);


        if (location.search.includes('id=')) {
          setTimeout(() => {
            alert(`Order placed successfully! Your tracking ID is: ${trackingId}`);
          }, 500);
        }
      } else {
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    navigate(`/track?id=${orderId.toUpperCase()}`);
    handleTrackOrderById(orderId.toUpperCase());
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
              <p className="text-sm text-gray-600 mb-2">
                Enter your order ID from checkout to track your delivery
              </p>
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
                    <p className="text-gray-600 mb-1">Order ID: {trackingData.id}</p>
                    <p className="text-gray-600 mb-1">Restaurant: {trackingData.restaurant?.name}</p>
                    <p className="text-gray-600 mb-1">Items: {trackingData.items?.map(item => item.name).join(', ')}</p>
                    <p className="text-gray-600">Total: ${trackingData.total}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <p className="text-gray-600">
                        {trackingData.deliveryAddress?.street}, {trackingData.deliveryAddress?.city}, {trackingData.deliveryAddress?.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card overflow-hidden">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
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
                      onClick={() => setShowChat(true)}
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
      
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        orderId={trackingData?.id}
        driverInfo={trackingData?.driver}
      />
    </div>
  );
}

export default TrackingPage;
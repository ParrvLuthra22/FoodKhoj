import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, User, Phone, MessageCircle, Navigation, CheckCircle, Crosshair } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ChatModal from '../components/chat/ChatModal';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const deliveryIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const driverIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const restaurantIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const delhiRestaurants = [
  {
    name: "Khan Chacha",
    location: [28.7041, 77.1025], 
    cuisine: "Kebabs & Rolls",
    rating: 4.5
  },
  {
    name: "Karim's",
    location: [28.6562, 77.2410], 
    cuisine: "Mughlai",
    rating: 4.3
  },
  {
    name: "Dilli Haat",
    location: [28.5684, 77.2350], 
    cuisine: "Street Food",
    rating: 4.2
  },
  {
    name: "Bukhara",
    location: [28.6129, 77.2295], 
    cuisine: "North Indian",
    rating: 4.8
  },
  {
    name: "Pindi",
    location: [28.6139, 77.2090], 
    cuisine: "Punjabi",
    rating: 4.1
  }
];

function MapUpdater({ driverPosition, userLocation, restaurantLocation }) {
  const map = useMap();
  
  useEffect(() => {
    if (driverPosition) {
      map.setView(driverPosition, 15);
    }
  }, [driverPosition, map]);
  
  useEffect(() => {
    if (userLocation && restaurantLocation) {
      const bounds = L.latLngBounds([restaurantLocation, userLocation]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [userLocation, restaurantLocation, map]);
  
  return null;
}

function TrackingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [driverPosition, setDriverPosition] = useState([28.7041, 77.1025]); 
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const { currentUser } = useAuth();

  const deliveryLocation = userLocation || [28.6139, 77.2090]; 

  const generateFakeRoute = (start, end) => {
    const route = [start];
    
    const numWaypoints = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 1; i <= numWaypoints; i++) {
      const lat = start[0] + (end[0] - start[0]) * (i / (numWaypoints + 1)) + (Math.random() - 0.5) * 0.01;
      const lng = start[1] + (end[1] - start[1]) * (i / (numWaypoints + 1)) + (Math.random() - 0.5) * 0.01;
      route.push([lat, lng]);
    }
    
    route.push(end);
    return route;
  };

  const getUserLocation = () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newUserLocation = [latitude, longitude];
        setUserLocation(newUserLocation);
        
        if (selectedRestaurant) {
          const route = generateFakeRoute(selectedRestaurant.location, newUserLocation);
          setRoutePath(route);
        }
        
        setLocationLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            break;
        }
        setLocationError(errorMessage);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const trackingIdFromUrl = urlParams.get('id');
    if (trackingIdFromUrl) {
      setOrderId(trackingIdFromUrl);
      // Don't automatically start tracking - let user click the track button
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

        const randomRestaurant = delhiRestaurants[Math.floor(Math.random() * delhiRestaurants.length)];
        setSelectedRestaurant(randomRestaurant);
        setDriverPosition(randomRestaurant.location);

        if (userLocation) {
          const route = generateFakeRoute(randomRestaurant.location, userLocation);
          setRoutePath(route);
        }

        // Start driver movement simulation when user manually tracks
        simulateDriverMovement();
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

  const simulateDriverMovement = () => {
    if (!selectedRestaurant || !userLocation) return;
    
    const route = generateFakeRoute(selectedRestaurant.location, userLocation);
    setRoutePath(route);
    
    let currentWaypointIndex = 0;
    
    const interval = setInterval(() => {
      if (currentWaypointIndex < route.length - 1) {
        setDriverPosition(route[currentWaypointIndex]);
        currentWaypointIndex++;
      } else {
        setDriverPosition(userLocation);
        clearInterval(interval);
      }
    }, 2000); 
    return () => clearInterval(interval);
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
  'Currently at Connaught Place outer circle',
  'Heading south on Barakhamba Road',
  'Turning onto Kasturba Gandhi Marg',
  'Approaching your block near India Gate',
  'Looking for parking near the complex'
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
              <p className="text-xs text-gray-500">
                Live tracking will only start after you enter a valid order ID
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
                    <p className="text-gray-600 mb-1">Restaurant: {selectedRestaurant?.name || trackingData.restaurant?.name}</p>
                    <p className="text-gray-600 mb-1">Items: {trackingData.items?.map(item => item.name).join(', ')}</p>
                    <p className="text-gray-600">Total: {trackingData.totalINR || `₹${Math.round(trackingData.total * 83)}`}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Delivery Address</h3>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                      <p className="text-gray-600">
                        {userLocation ? 'Your current location' : `${trackingData.deliveryAddress?.street}, ${trackingData.deliveryAddress?.city}, ${trackingData.deliveryAddress?.zipCode}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card overflow-hidden">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-[1000]">
                    <button
                      onClick={getUserLocation}
                      disabled={locationLoading}
                      className="bg-white rounded-lg p-3 shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                      title="Get my location"
                    >
                      <Crosshair className={`h-5 w-5 ${locationLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  {locationError && (
                    <div className="absolute top-4 left-16 z-[1000]">
                      <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-sm">
                        {locationError}
                      </div>
                    </div>
                  )}

                  {userLocation && (
                    <div className="absolute top-4 left-16 z-[1000]">
                      <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded-lg text-sm">
                        Location found!
                      </div>
                    </div>
                  )}

                  <div className="h-96 w-full">
                    <MapContainer
                      center={deliveryLocation}
                      zoom={13}
                      className="h-full w-full"
                      style={{ height: '400px', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      
                      {selectedRestaurant && (
                        <Marker position={selectedRestaurant.location} icon={restaurantIcon}>
                          <Popup>
                            <div className="text-center">
                              <h3 className="font-semibold text-orange-600">{selectedRestaurant.name}</h3>
                              <p className="text-sm text-gray-600">{selectedRestaurant.cuisine}</p>
                              <p className="text-xs text-gray-500">★ {selectedRestaurant.rating}</p>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                      
                      <Marker position={deliveryLocation} icon={deliveryIcon}>
                        <Popup>
                          <div className="text-center">
                            <h3 className="font-semibold text-red-600">Delivery Location</h3>
                            <p className="text-sm text-gray-600">
                              {userLocation ? 'Your current location' : 'Delivery address'}
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                      
                      <Marker position={driverPosition} icon={driverIcon}>
                        <Popup>
                          <div className="text-center">
                            <h3 className="font-semibold text-blue-600">Driver Location</h3>
                            <p className="text-sm text-gray-600">{trackingData.driver.name}</p>
                            <p className="text-xs text-gray-500">{getRandomDriverLocation()}</p>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {userLocation && (
                        <Marker position={userLocation} icon={userLocationIcon}>
                          <Popup>
                            <div className="text-center">
                              <h3 className="font-semibold text-green-600">Your Location</h3>
                              <p className="text-sm text-gray-600">Current position</p>
                            </div>
                          </Popup>
                        </Marker>
                      )}
                      
                      {routePath.length > 0 && (
                        <Polyline 
                          positions={routePath}
                          color="#3B82F6"
                          weight={3}
                          opacity={0.7}
                        />
                      )}
                      
                      <MapUpdater 
                        driverPosition={driverPosition} 
                        userLocation={userLocation} 
                        restaurantLocation={selectedRestaurant?.location}
                      />
                    </MapContainer>
                  </div>
                  
                  <div className="absolute top-4 right-4 z-[1000]">
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

                  <div className="absolute bottom-8 right-8 z-[1000]">
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
                    <button 
                      className="bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 transition-colors"
                      onClick={() => setShowChat(true)}
                    >
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
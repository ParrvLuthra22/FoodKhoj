import React, { useState, useEffect } from 'react';
import { MapPin, Clock, MessageCircle, Phone, Navigation } from 'lucide-react';
import ChatModal from '../chat/ChatModal';
import { useAuth } from '../../contexts/AuthContext';

function OrderTrackingCard({ order }) {
  const [showChat, setShowChat] = useState(false);
  const [orderStatus, setOrderStatus] = useState('preparing');
  const [estimatedTime, setEstimatedTime] = useState('25-30 min');
  const { currentUser } = useAuth();

  const driverInfo = {
    name: 'Parrv Luthra',
    phone: '+91 96257 89901',
    eta: '15-20 min',
    vehicle: 'Porsche 911 Carrera',
    rating: 5
  };

  useEffect(() => {
    const statusUpdates = [
      { status: 'confirmed', time: '25-30 min', delay: 0 },
      { status: 'preparing', time: '20-25 min', delay: 5000 },
      { status: 'ready', time: '15-20 min', delay: 15000 },
      { status: 'picked_up', time: '10-15 min', delay: 20000 },
      { status: 'on_the_way', time: '5-10 min', delay: 25000 },
    ];

    statusUpdates.forEach(({ status, time, delay }) => {
      setTimeout(() => {
        setOrderStatus(status);
        setEstimatedTime(time);
      }, delay);
    });
  }, []);

  const getStatusInfo = (status) => {
    const statusMap = {
      confirmed: {
        text: 'Order Confirmed',
        color: 'bg-blue-500',
        description: 'Restaurant has received your order'
      },
      preparing: {
        text: 'Preparing',
        color: 'bg-yellow-500',
        description: 'Your food is being prepared'
      },
      ready: {
        text: 'Ready for Pickup',
        color: 'bg-orange-500',
        description: 'Food is ready, waiting for driver'
      },
      picked_up: {
        text: 'Picked Up',
        color: 'bg-purple-500',
        description: 'Driver has picked up your order'
      },
      on_the_way: {
        text: 'On the Way',
        color: 'bg-green-500',
        description: 'Driver is heading to your location'
      },
      delivered: {
        text: 'Delivered',
        color: 'bg-green-600',
        description: 'Order has been delivered'
      }
    };

    return statusMap[status] || statusMap.confirmed;
  };

  const statusInfo = getStatusInfo(orderStatus);
  const showDriverInfo = ['picked_up', 'on_the_way'].includes(orderStatus);

  if (!currentUser) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-600">Please sign in to track your orders</p>
      </div>
    );
  }

  return (
    <>
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Order #{order?.id || '12345'}</h3>
            <p className="text-gray-600">{order?.restaurant || 'Bella Italia'}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-500">${order?.total || '24.99'}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-3">
            <div className={`w-4 h-4 rounded-full ${statusInfo.color} mr-3`}></div>
            <div>
              <p className="font-semibold">{statusInfo.text}</p>
              <p className="text-sm text-gray-600">{statusInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Estimated delivery: {estimatedTime}</span>
          </div>
        </div>

        {showDriverInfo && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold mb-3">Your Driver</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-primary-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold mr-3">
                  {driverInfo.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{driverInfo.name}</p>
                  <p className="text-sm text-gray-600">{driverInfo.vehicle}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{driverInfo.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowChat(true)}
                  className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600"
                  title="Chat with driver"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                <a
                  href={`tel:${driverInfo.phone}`}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                  title="Call driver"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Address</p>
              <p className="text-gray-600">
                {order?.address || '108 Pragati Hills , Gurgaon sector 47, Gurgaon, Haryana 122022'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {order?.instructions || 'Leave at door, ring bell'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-3">
          <button className="flex-1 btn btn-outline flex items-center justify-center">
            <Navigation className="h-4 w-4 mr-2" />
            Track on Map
          </button>
          {showDriverInfo && (
            <button
              onClick={() => setShowChat(true)}
              className="flex-1 btn btn-primary flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Driver
            </button>
          )}
        </div>
      </div>

      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        orderId={order?.id || '12345'}
        driverInfo={driverInfo}
      />
    </>
  );
}

export default OrderTrackingCard;
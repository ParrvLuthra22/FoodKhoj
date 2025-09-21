import React, { useEffect, useState } from 'react';
import { CheckCircle2, Download, Mail, ArrowRight, MapPin, Clock } from 'lucide-react';

const PaymentSuccess = ({ 
  isVisible, 
  onClose, 
  paymentData, 
  orderData,
  onTrackOrder,
  onDownloadReceipt,
  className = ''
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-hide confetti after animation
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full -ml-12 -mb-12 opacity-50"></div>

        {/* Success Icon */}
        <div className="relative text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your order has been confirmed and is being prepared</p>
        </div>

        {/* Order Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="font-semibold text-gray-900">{orderData?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Payment ID</span>
              <span className="font-semibold text-gray-900 text-sm">{paymentData?.payment?.id || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Amount Paid</span>
              <span className="font-semibold text-green-600">₹{paymentData?.payment?.amount || orderData?.totalINR}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="font-semibold text-gray-900 capitalize">{paymentData?.payment?.method || 'Card'}</span>
            </div>
          </div>

          {/* Restaurant Info */}
          {orderData?.restaurant && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {orderData.restaurant.name?.charAt(0) || 'R'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{orderData.restaurant.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>25-30 min estimated delivery</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          {orderData?.deliveryAddress && (
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Delivery Address</h4>
                  <p className="text-sm text-gray-600">
                    {orderData.deliveryAddress.street}, {orderData.deliveryAddress.city} {orderData.deliveryAddress.zipCode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onTrackOrder}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Track Your Order</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onDownloadReceipt}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Receipt</span>
            </button>
            
            <button
              onClick={() => {
                // Send email receipt functionality
                console.log('Send email receipt');
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SSL Secured</span>
            </div>
            <span>•</span>
            <span>Powered by Razorpay</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Bank Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
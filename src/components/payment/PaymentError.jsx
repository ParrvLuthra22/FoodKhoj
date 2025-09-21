import React from 'react';
import { XCircle, RefreshCw, ArrowLeft, AlertCircle, Headphones } from 'lucide-react';

const PaymentError = ({ 
  isVisible, 
  onClose, 
  onRetry, 
  error, 
  orderData,
  className = '' 
}) => {
  if (!isVisible) return null;

  const getErrorDetails = (errorMessage) => {
    const errorTypes = {
      'payment_failed': {
        title: 'Payment Failed',
        description: 'Your payment could not be processed. Please try again with a different payment method.',
        suggestion: 'Check your card details or try a different payment method',
        icon: XCircle,
        color: 'text-red-500',
      },
      'insufficient_funds': {
        title: 'Insufficient Funds',
        description: 'Your account has insufficient funds to complete this transaction.',
        suggestion: 'Please check your account balance or use a different card',
        icon: AlertCircle,
        color: 'text-orange-500',
      },
      'card_declined': {
        title: 'Card Declined',
        description: 'Your card was declined by the bank. Please contact your bank or try a different card.',
        suggestion: 'Contact your bank or try another payment method',
        icon: XCircle,
        color: 'text-red-500',
      },
      'network_error': {
        title: 'Network Error',
        description: 'We encountered a network issue while processing your payment.',
        suggestion: 'Please check your internet connection and try again',
        icon: AlertCircle,
        color: 'text-yellow-500',
      },
      'cancelled': {
        title: 'Payment Cancelled',
        description: 'You cancelled the payment process.',
        suggestion: 'You can try again whenever you\'re ready',
        icon: XCircle,
        color: 'text-gray-500',
      },
    };

    // Try to match error message to known error types
    for (const [key, value] of Object.entries(errorTypes)) {
      if (errorMessage?.toLowerCase().includes(key) || errorMessage?.toLowerCase().includes(value.title.toLowerCase())) {
        return value;
      }
    }

    // Default error type
    return {
      title: 'Payment Error',
      description: errorMessage || 'An unexpected error occurred while processing your payment.',
      suggestion: 'Please try again or contact support if the issue persists',
      icon: XCircle,
      color: 'text-red-500',
    };
  };

  const errorDetails = getErrorDetails(error);
  const Icon = errorDetails.icon;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-orange-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-50 to-pink-50 rounded-full -ml-12 -mb-12 opacity-50"></div>

        {/* Error Icon */}
        <div className="relative text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Icon className={`h-12 w-12 text-white`} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{errorDetails.title}</h2>
          <p className="text-gray-600 leading-relaxed">{errorDetails.description}</p>
        </div>

        {/* Error Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">What you can do:</h4>
              <p className="text-sm text-gray-600">{errorDetails.suggestion}</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {orderData && (
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{orderData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">{orderData.totalINR}</span>
              </div>
              {orderData.restaurant && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurant:</span>
                  <span className="font-medium">{orderData.restaurant.name}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          )}

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </button>
            
            <button
              onClick={() => {
                // Contact support functionality
                window.open('mailto:support@foodkhoj.com?subject=Payment Issue&body=Order ID: ' + (orderData?.id || 'N/A'), '_blank');
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Headphones className="h-4 w-4" />
              <span>Support</span>
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-center">
            <h5 className="font-medium text-gray-900 mb-2">Need Help?</h5>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <a 
                href="tel:+91-80-6202-6202" 
                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              >
                <Headphones className="h-4 w-4" />
                <span>Call Support</span>
              </a>
              <span>•</span>
              <a 
                href="mailto:support@foodkhoj.com" 
                className="hover:text-blue-600 transition-colors"
              >
                Email Us
              </a>
              <span>•</span>
              <a 
                href="/help" 
                className="hover:text-blue-600 transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-4">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Your data is secure</span>
            </div>
            <span>•</span>
            <span>No charges applied</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;
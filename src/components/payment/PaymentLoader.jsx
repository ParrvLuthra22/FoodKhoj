import React from 'react';
import { CreditCard, Shield, CheckCircle2 } from 'lucide-react';

const PaymentLoader = ({ step = 'processing', message, className = '' }) => {
  const steps = {
    processing: {
      icon: CreditCard,
      title: 'Processing Payment',
      description: message || 'Please wait while we process your payment securely...',
      color: 'text-blue-500',
    },
    verifying: {
      icon: Shield,
      title: 'Verifying Payment',
      description: message || 'Verifying your payment details...',
      color: 'text-orange-500',
    },
    success: {
      icon: CheckCircle2,
      title: 'Payment Successful',
      description: message || 'Your payment has been processed successfully!',
      color: 'text-green-500',
    },
  };

  const currentStep = steps[step] || steps.processing;
  const Icon = currentStep.icon;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Animated Background */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse"></div>
          <div className="relative bg-white rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center shadow-lg">
            <Icon className={`h-12 w-12 ${currentStep.color} animate-bounce`} />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {currentStep.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {currentStep.description}
          </p>
        </div>

        {/* Progress Bar */}
        {step !== 'success' && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse-slow relative">
              <div className="absolute inset-0 bg-white opacity-25 rounded-full animate-shimmer"></div>
            </div>
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield className="h-4 w-4" />
          <span>Secured by Razorpay</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping animation-delay-200"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping animation-delay-400"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default PaymentLoader;
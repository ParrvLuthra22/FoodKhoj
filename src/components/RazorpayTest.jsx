import React, { useState } from 'react';

const RazorpayTest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      
      document.body.appendChild(script);
    });
  };

  const handleTestPayment = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Testing Razorpay integration...');
      console.log('Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      // Test payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890',
        amount: 50000, // ₹500 in paisa
        currency: 'INR',
        name: 'FoodKhoj Test',
        description: 'Test Payment',
        handler: function (response) {
          console.log('Payment successful:', response);
          setSuccess(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          setLoading(false);
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setError('Payment was cancelled');
            setLoading(false);
          }
        }
      };

      console.log('Opening Razorpay with options:', options);
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error('Error:', err);
      setError(`Error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Razorpay Test</h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Razorpay Key:</strong> {import.meta.env.VITE_RAZORPAY_KEY_ID || 'Not set'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <button
        onClick={handleTestPayment}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Test Payment (₹500)'}
      </button>

      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Test Cards:</strong></p>
        <p>Success: 4111 1111 1111 1111</p>
        <p>Failure: 4000 0000 0000 0002</p>
        <p>Any future date for expiry, any 3-digit CVV</p>
      </div>
    </div>
  );
};

export default RazorpayTest;
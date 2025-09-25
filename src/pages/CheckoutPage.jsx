import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Clock, CheckCircle, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useRazorpay } from '../hooks/useRazorpay';
import { convertAndFormatUSDToINR } from '../utils/currencyConverter';
import PaymentLoader from '../components/payment/PaymentLoader';
import PaymentSuccess from '../components/payment/PaymentSuccess';
import PaymentError from '../components/payment/PaymentError';
import MapComponent from '../components/shared/MapComponent';
import ChatModal from '../components/chat/ChatModal';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const { processPayment, loading: paymentLoading, error: paymentError, clearError } = useRazorpay();
  
  const [error, setError] = useState('');
  const [paymentStep, setPaymentStep] = useState('idle'); // idle, processing, success, error, completed
  const [paymentData, setPaymentData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    instructions: ''
  });

  const [customerInfo, setCustomerInfo] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: ''
  });

  const deliveryFee = 2.99;
  const deliveryFeeINR = convertAndFormatUSDToINR(deliveryFee);
  const subtotal = getTotalPrice();
  const subtotalINR = convertAndFormatUSDToINR(subtotal);
  const tax = subtotal * 0.08;
  const taxINR = convertAndFormatUSDToINR(tax);
  const total = subtotal + deliveryFee + tax;
  const totalINR = convertAndFormatUSDToINR(total);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.zipCode) {
      setError('Please fill in all delivery address fields.');
      return;
    }
    
    if (!customerInfo.name || !customerInfo.email) {
      setError('Please fill in your name and email.');
      return;
    }

    setError('');
    clearError();
    setPaymentStep('processing');

    try {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      const trackingId = `FD${timestamp.toString().slice(-6)}${randomNum}`;

      const orderPayload = {
        id: trackingId,
        customerId: currentUser?.uid || 'guest',
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        restaurant: {
          id: cart.restaurant?.id,
          name: cart.restaurant?.name || 'Restaurant'
        },
        items: cart.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          priceINR: item.priceINR,
          quantity: item.quantity
        })),
        total: parseFloat(total.toFixed(2)),
        totalINR: totalINR,
        deliveryAddress: deliveryAddress,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        driver: {
          name: 'Parrv Luthra',
          phone: '+91 96257 89901',
          vehicle: 'Porsche 911 Carrera',
          rating: 5
        }
      };

      setOrderData(orderPayload);

      // Process payment through Razorpay
      const response = await processPayment(orderPayload);
      
      setPaymentData(response);
      setPaymentStep('success');
      
      // Store order in localStorage for tracking
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '{}');
      existingOrders[trackingId] = {
        ...orderPayload,
        status: 'confirmed',
        paymentId: response.payment?.id,
        paidAt: new Date().toISOString()
      };
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // Don't clear cart immediately - let user see success state first
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStep('error');
      setError(error.message || 'Payment processing failed. Please try again.');
    }
  };

  const handleRetryPayment = () => {
    setPaymentStep('idle');
    setError('');
    clearError();
  };

  const handlePaymentSuccess = () => {
    // Clear the cart and navigate to tracking
    clearCart();
    navigate(`/track?id=${orderData?.id}`);
  };

  const handleClosePaymentModal = () => {
    // When closing success modal, show the post-payment checkout view
    setPaymentStep('completed');
    setError('');
    clearError();
  };

  const handleContinueShopping = () => {
    clearCart();
    navigate('/restaurants');
  };

  if (!currentUser) {
    navigate('/restaurants');
    return null;
  }

  // Only redirect to restaurants if cart is empty AND we're not in a payment flow
  if (cart.items.length === 0 && paymentStep === 'idle' && !orderData) {
    navigate('/restaurants');
    return null;
  }

  // Show post-payment success view
  if (paymentStep === 'completed' && orderData) {
    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="container py-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-green-600 mb-2">✅ Order Confirmed!</h1>
                <p className="text-gray-600">Your order has been placed successfully and is being prepared.</p>
              </div>
              <button
                onClick={handleContinueShopping}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono font-medium">{orderData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Restaurant:</span>
                    <span className="font-medium">{orderData.restaurant?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Paid:</span>
                    <span className="font-semibold text-green-600">{orderData.totalINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <span className="font-mono text-xs">{paymentData?.payment?.id}</span>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Address:</span>
                    <p className="font-medium">{orderData.deliveryAddress?.street}</p>
                    <p className="font-medium">{orderData.deliveryAddress?.city}, {orderData.deliveryAddress?.zipCode}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span>Driver:</span>
                    <span className="font-medium">{orderData.driver?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span className="font-medium">{orderData.driver?.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{orderData.driver?.phone}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>💬</span>
                    <span>Chat with Driver</span>
                  </button>
                  <button
                    onClick={() => navigate(`/track?id=${orderData.id}`)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Full Tracking
                  </button>
                </div>
              </div>
            </div>

            {/* Live Map */}
            <div className="card overflow-hidden">
              <div className="p-4 bg-green-50 border-b border-green-200">
                <h3 className="text-lg font-semibold text-green-800">🚛 Live Delivery Tracking</h3>
                <p className="text-sm text-green-600">Watch your order in real-time</p>
              </div>
              <MapComponent isActive={true} orderData={orderData} />
            </div>
          </div>
        </div>

        {/* Chat Modal */}
        <ChatModal 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          orderId={orderData.id}
          driverInfo={orderData.driver}
        />
      </div>
    );
  }

  return (
    <>
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {error && (
              <div className="lg:col-span-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
          
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold">Customer Information</h2>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </form>
              </div>

              {/* Delivery Address */}
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold">Delivery Address</h2>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.street}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="New Delhi"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress.zipCode}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, zipCode: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="110034"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      value={deliveryAddress.instructions}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, instructions: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Leave at door, ring bell, etc."
                      rows="3"
                    />
                  </div>
                </form>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-6 w-6 text-primary-500 mr-2" />
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Secure Payment by Razorpay</h3>
                      <p className="text-sm text-gray-600">All payment methods are supported</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 text-center border">
                      <div className="text-xs text-gray-600 mb-1">UPI</div>
                      <div className="text-sm font-medium">GooglePay, PhonePe</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border">
                      <div className="text-xs text-gray-600 mb-1">Cards</div>
                      <div className="text-sm font-medium">Visa, Mastercard</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border">
                      <div className="text-xs text-gray-600 mb-1">Banking</div>
                      <div className="text-sm font-medium">Net Banking</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center border">
                      <div className="text-xs text-gray-600 mb-1">Wallets</div>
                      <div className="text-sm font-medium">Paytm, Amazon</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {cart.restaurant && (
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h3 className="font-medium">{cart.restaurant.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>25-30 min delivery</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.priceINR || `₹${Math.round(item.price * 83 * item.quantity)}`}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotalINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFeeINR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{taxINR}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>{totalINR}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={paymentLoading || paymentStep === 'processing'}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {paymentLoading || paymentStep === 'processing' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Pay Securely - {totalINR}</span>
                    </>
                  )}
                </button>
                
                {/* Payment Security Note */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    By clicking "Pay Securely", you agree to our terms and conditions
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>256-bit SSL</span>
                    </div>
                    <span>•</span>
                    <span>Powered by Razorpay</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modals */}
      <PaymentLoader 
        step={paymentStep === 'processing' ? 'processing' : 'verifying'}
        className={paymentStep === 'processing' ? '' : 'hidden'}
      />
      
      <PaymentSuccess 
        isVisible={paymentStep === 'success'}
        onClose={handleClosePaymentModal}
        paymentData={paymentData}
        orderData={orderData}
        onTrackOrder={handlePaymentSuccess}
      />
      
      <PaymentError 
        isVisible={paymentStep === 'error'}
        onClose={handleClosePaymentModal}
        onRetry={handleRetryPayment}
        error={error || paymentError}
        orderData={orderData}
      />
    </>
  );
}

export default CheckoutPage;
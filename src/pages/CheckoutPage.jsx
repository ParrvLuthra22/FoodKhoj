import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createOrder } from '../services/orderService';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    zipCode: '',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const deliveryFee = 2.99;
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; 
  const total = subtotal + deliveryFee + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      const trackingId = `FD${timestamp.toString().slice(-6)}${randomNum}`;

      const orderData = {
        id: trackingId,
        restaurant: {
          id: cart.restaurant?.id,
          name: cart.restaurant?.name || 'Restaurant'
        },
        items: cart.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: total.toFixed(2),
        deliveryAddress: deliveryAddress,
        paymentMethod: paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes from now
        driver: {
          name: 'Parrv Luthra',
          phone: '+91 97283 23123',
          vehicle: 'Porsche 911 Carrera',
          rating: 5
        }
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '{}');
      existingOrders[trackingId] = orderData;
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      clearCart();
      
      navigate(`/track?id=${trackingId}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    navigate('/restaurants');
    return null;
  }

  if (cart.items.length === 0) {
    navigate('/restaurants');
    return null;
  }

  return (
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="New York"
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
                      placeholder="10001"
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

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-primary-500 mr-2" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentMethod.cardNumber}
                    onChange={(e) => setPaymentMethod({...paymentMethod, cardNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentMethod.expiryDate}
                      onChange={(e) => setPaymentMethod({...paymentMethod, expiryDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentMethod.cvv}
                      onChange={(e) => setPaymentMethod({...paymentMethod, cvv: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={paymentMethod.nameOnCard}
                    onChange={(e) => setPaymentMethod({...paymentMethod, nameOnCard: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </form>
            </div>
          </div>

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
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full btn btn-primary py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing Order...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
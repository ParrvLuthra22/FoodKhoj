import React, { useState, useEffect } from 'react';
import { Clock, Package, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import OrderTrackingCard from '../components/tracking/OrderTrackingCard';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const mockOrders = [
        {
          id: '12345',
          restaurant: 'Billus Hut',
          items: ['White Sauce Pasta', 'Caesar Salad'],
          total: 24.99,
          status: 'on_the_way',
          orderTime: new Date(Date.now() - 30 * 60 * 1000), 
          estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000), 
          address: '213 NSP, Pitampura, New Delhi, Delhi 110034',
          instructions: 'Leave at door, ring bell'
        },
        {
          id: '12344',
          restaurant: 'Kings Kitchen',
          items: ['Sweet & Sour Chicken', 'Fried Rice', 'Spring Rolls'],
          total: 32.50,
          status: 'delivered',
          orderTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          deliveredTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
          address: '432 Andheri East, Bandra, Mumbai, Maharastra 11201',
        },
        {
          id: '12343',
          restaurant: 'Burger King',
          items: ['Classic Burger', 'Fries', 'Milkshake'],
          total: 18.75,
          status: 'delivered',
          orderTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 
          deliveredTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
          address: '789 peeragarhi, rohtak road, new delhi, Delhi 110043',
        }
      ];
      setOrders(mockOrders);
    }
  }, [currentUser]);

  const activeOrders = orders.filter(order => 
    ['confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way'].includes(order.status)
  );
  
  const pastOrders = orders.filter(order => 
    ['delivered', 'cancelled'].includes(order.status)
  );

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (!currentUser) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600">Please sign in to view your orders</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <div className="flex space-x-1 mb-8 bg-gray-200 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'active'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'past'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Orders ({pastOrders.length})
          </button>
        </div>

        {activeTab === 'active' && (
          <div className="space-y-6">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Orders</h3>
                <p className="text-gray-600 mb-6">You don't have any active orders right now</p>
                <a href="/restaurants" className="btn btn-primary">
                  Order Food
                </a>
              </div>
            ) : (
              activeOrders.map(order => (
                <OrderTrackingCard key={order.id} order={order} />
              ))
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Past Orders</h3>
                <p className="text-gray-600">Your order history will appear here</p>
              </div>
            ) : (
              pastOrders.map(order => (
                <div key={order.id} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <div className="ml-3">
                        <h3 className="font-semibold">Order #{order.id}</h3>
                        <p className="text-gray-600">{order.restaurant}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total}</p>
                      <p className="text-sm text-gray-600">
                        {order.status === 'delivered' 
                          ? formatDate(order.deliveredTime)
                          : formatDate(order.orderTime)
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600 mb-2">Items:</p>
                    <p className="text-gray-900">{order.items.join(', ')}</p>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button className="btn btn-outline text-sm">
                      Reorder
                    </button>
                    <button className="btn btn-outline text-sm">
                      View Receipt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
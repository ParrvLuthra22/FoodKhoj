import { ref, push, set, get, onValue, off, serverTimestamp } from 'firebase/database';
import { database } from '../config/firebase';

export const createOrder = async (orderData, userId) => {
  try {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const orderId = `FD${timestamp.toString().slice(-6)}${randomNum}`;

    const order = {
      id: orderId,
      userId: userId,
      restaurant: orderData.restaurant,
      items: orderData.items,
      total: orderData.total,
      deliveryAddress: orderData.deliveryAddress,
      paymentMethod: orderData.paymentMethod,
      status: 'confirmed',
      createdAt: serverTimestamp(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(), 
      driver: getRandomDriver()
    };

    const orderRef = ref(database, `orders/${orderId}`);
    await set(orderRef, order);

    const userOrderRef = ref(database, `users/${userId}/orders/${orderId}`);
    await set(userOrderRef, {
      orderId: orderId,
      createdAt: serverTimestamp(),
      status: 'confirmed'
    });

    return orderId;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderByTrackingId = async (trackingId) => {
  try {
    const orderRef = ref(database, `orders/${trackingId}`);
    const snapshot = await get(orderRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const subscribeToOrderUpdates = (trackingId, callback) => {
  const orderRef = ref(database, `orders/${trackingId}`);
  onValue(orderRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    }
  });

  return () => off(orderRef);
};

export const updateOrderStatus = async (trackingId, status, additionalData = {}) => {
  try {
    const orderRef = ref(database, `orders/${trackingId}`);
    const updates = {
      status: status,
      lastUpdated: serverTimestamp(),
      ...additionalData
    };
    
    await set(orderRef, updates);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

const getRandomDriver = () => {
  const drivers = [
    {
      id: 'driver1',
      name: 'Parrv Luthra',
      phone: '+91 97283 23123',
      vehicle: 'Porsche 911 Carrera',
      rating: 5,
      photo: 'https://i.pinimg.com/736x/dd/0d/6d/dd0d6daa93c225efef46ce930602aeee.jpg'
    },
    {
      id: 'driver2',
      name: 'Aayrish Singh',
      phone: '+91 93234 23123',
      vehicle: 'Ferrari 250 GTO',
      rating: 4.9,
      photo: 'https://i.pinimg.com/736x/3e/78/bb/3e78bba322c95083af166170c4ccce77.jpg'
    },
    {
      id: 'driver3',
      name: 'Aayushman Sharma',
      phone: '+91 96437 09323',
      vehicle: 'Ford Focus - DEF 456',
      rating: 4.7,
      photo: 'https://i.pinimg.com/736x/d5/4e/75/d54e75a4a88d9769f330382f57ca2176.jpg'
    }
  ];

  return drivers[Math.floor(Math.random() * drivers.length)];
};
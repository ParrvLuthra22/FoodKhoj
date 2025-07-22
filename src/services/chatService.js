import { ref, push, onValue, off, serverTimestamp, set } from 'firebase/database';
import { database } from '../config/firebase';

export const sendMessage = async (orderId, senderId, senderName, senderType, message) => {
  try {
    const chatRef = ref(database, `chats/${orderId}/messages`);
    await push(chatRef, {
      senderId: senderId,
      senderName: senderName,
      senderType: senderType,
      message: message.trim(),
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const subscribeToChatMessages = (orderId, callback) => {
  const messagesRef = ref(database, `chats/${orderId}/messages`);
  
  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messages = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      })).sort((a, b) => {
        const aTime = a.timestamp || new Date(a.createdAt).getTime();
        const bTime = b.timestamp || new Date(b.createdAt).getTime();
        return aTime - bTime;
      });
      callback(messages);
    } else {
      callback([]);
    }
  });

  return () => off(messagesRef);
};

export const updateTypingStatus = async (orderId, userId, isTyping) => {
  try {
    const typingRef = ref(database, `chats/${orderId}/typing/${userId}`);
    if (isTyping) {
      await set(typingRef, {
        isTyping: true,
        timestamp: serverTimestamp()
      });
    } else {
      await set(typingRef, null); 
    }
  } catch (error) {
    console.error('Error updating typing status:', error);
  }
};

export const subscribeToTypingStatus = (orderId, currentUserId, callback) => {
  const typingRef = ref(database, `chats/${orderId}/typing`);
  
  const unsubscribe = onValue(typingRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const otherUserTyping = Object.entries(data).some(([userId, typingData]) => 
        userId !== currentUserId && typingData.isTyping
      );
      callback(otherUserTyping);
    } else {
      callback(false);
    }
  });

  return () => off(typingRef);
};

export const initializeChatForOrder = async (orderId, customerId, driverId) => {
  try {
    const chatRef = ref(database, `chats/${orderId}/participants`);
    await set(chatRef, {
      customer: customerId,
      driver: driverId,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error initializing chat:', error);
    throw error;
  }
};
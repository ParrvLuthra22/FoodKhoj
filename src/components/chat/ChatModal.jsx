import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, User, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ref, push, onValue, off, serverTimestamp } from 'firebase/database';
import { database } from '../../config/firebase';

function ChatModal({ isOpen, onClose, orderId, driverInfo }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();

  const chatId = `order_${orderId}`;

  useEffect(() => {
    if (!isOpen || !orderId || !currentUser) return;

    const messagesRef = ref(database, `chats/${chatId}/messages`);
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })).sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    });

    const typingRef = ref(database, `chats/${chatId}/typing`);
    const typingUnsubscribe = onValue(typingRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.userId !== currentUser.uid) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      off(messagesRef);
      off(typingRef);
    };
  }, [isOpen, orderId, currentUser, chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    setLoading(true);
    try {
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      await push(messagesRef, {
        text: newMessage.trim(),
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'Customer',
        senderType: 'customer',
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTypingStatus = (isTyping) => {
    if (!currentUser) return;
    
    const typingRef = ref(database, `chats/${chatId}/typing`);
    push(typingRef, {
      userId: currentUser.uid,
      isTyping,
      timestamp: serverTimestamp()
    });
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    updateTypingStatus(true);
    
    setTimeout(() => {
      updateTypingStatus(false);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full h-[600px] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary-500 rounded-full p-2 mr-3">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Chat with Driver</h3>
              <p className="text-sm text-gray-600">
                {driverInfo?.name || 'Your delivery driver'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {driverInfo && (
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full p-2 mr-3">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-sm">{driverInfo.name}</p>
                <p className="text-xs text-gray-600">
                  Order #{orderId} • ETA: {driverInfo.eta || '15-20 min'}
                </p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                  Online
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">Start a conversation with your driver</p>
              <p className="text-xs text-gray-400 mt-1">
                Ask about delivery status, location, or special instructions
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.senderId === currentUser?.uid
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs opacity-75">
                      {message.senderType === 'driver' ? 'Driver' : 'You'}
                    </span>
                    <span className="text-xs opacity-75 ml-2">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 max-w-xs px-3 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-600 ml-2">Driver is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <form onSubmit={sendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Are you close?",
              "Where are you?",
              "Please ring the bell",
              "Leave at door"
            ].map((quickMessage) => (
              <button
                key={quickMessage}
                onClick={() => setNewMessage(quickMessage)}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200"
              >
                {quickMessage}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
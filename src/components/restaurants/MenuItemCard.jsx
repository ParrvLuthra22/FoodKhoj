import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

function MenuItemCard({ item }) {
  const { cart, addItem, updateQuantity } = useCart();

  const cartItem = cart.items.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addItem({
      ...item,
      priceINR: item.priceINR || `₹${Math.round(item.price * 83)}`
    });
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      updateQuantity(item.id, 0);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="card p-4 flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-500">{item.priceINR || `₹${Math.round(item.price * 83)}`}</span>
          
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="font-medium w-8 text-center">{quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {item.image && (
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default MenuItemCard;
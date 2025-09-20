import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MenuItemCard from '../components/restaurants/MenuItemCard';
import { useCart } from '../contexts/CartContext';
import { getRestaurantById, getMenuItemsByRestaurantId } from '../data/mockData';

function RestaurantDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { setRestaurant: setCartRestaurant } = useCart();

  useEffect(() => {
    const restaurantData = getRestaurantById(id);
    const menuData = getMenuItemsByRestaurantId(id);
    
    if (restaurantData) {
      setRestaurant(restaurantData);
      setCartRestaurant(restaurantData);
    }
    
    if (menuData) {
      setMenu(menuData);
    }
  }, [id, setCartRestaurant]);

  // Get unique categories from menu items
  const categories = ['all', ...new Set(menu.map(item => item.category))];

  const filteredMenu = menu.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  if (!restaurant) {
    return (
      <div className="pt-20 bg-gray-50 min-h-screen">
        <div className="container py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading restaurant...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {/* Restaurant Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container py-6">
          <div className="flex items-center mb-4">
            <Link to="/restaurants" className="flex items-center text-gray-600 hover:text-primary-500 mr-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Restaurants
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{restaurant.distance} km away</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  restaurant.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {restaurant.isOpen ? 'Open' : 'Closed'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm text-gray-600">Delivery fee</p>
              <p className="text-xl font-bold">{restaurant.deliveryFeeINR}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Items' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default RestaurantDetailPage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import MenuItemCard from '../components/restaurants/MenuItemCard';
import { useCart } from '../contexts/CartContext';

function RestaurantDetailPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { setRestaurant: setCartRestaurant } = useCart();

  // Mock data - in a real app, this would come from Firebase
  useEffect(() => {
    const mockRestaurant = {
      id: id,
      name: 'Bella Italia',
      cuisine: 'Italian',
      rating: 4.8,
      deliveryTime: 25,
      distance: 1.2,
      deliveryFee: 2.99,
      isOpen: true,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.',
      address: '123 Main Street, Downtown',
      phone: '(555) 123-4567'
    };

    const mockMenu = [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil on our signature thin crust',
        price: 16.99,
        category: 'Pizza',
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '2',
        name: 'Pepperoni Pizza',
        description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
        price: 18.99,
        category: 'Pizza',
        image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '3',
        name: 'Spaghetti Carbonara',
        description: 'Creamy pasta with pancetta, eggs, and parmesan cheese',
        price: 14.99,
        category: 'Pasta',
        image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '4',
        name: 'Chicken Parmigiana',
        description: 'Breaded chicken breast with marinara sauce and melted mozzarella',
        price: 19.99,
        category: 'Main Course',
        image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '5',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with parmesan cheese, croutons, and Caesar dressing',
        price: 9.99,
        category: 'Salads',
        image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '6',
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
        price: 7.99,
        category: 'Desserts',
        image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ];

    setRestaurant(mockRestaurant);
    setMenu(mockMenu);
    setCartRestaurant(mockRestaurant);
  }, [id, setCartRestaurant]);

  const categories = ['all', ...new Set(menu.map(item => item.category))];

  const filteredMenu = selectedCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  if (!restaurant) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Restaurant Header */}
      <section className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="absolute top-4 left-4">
          <Link
            to="/restaurants"
            className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>

        <div className="container relative -mt-20 z-10">
          <div className="card p-6">
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
                <p className="text-xl font-bold">${restaurant.deliveryFee}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            {filteredMenu.map(item => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                restaurantInfo={restaurant}
              />
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
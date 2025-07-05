import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import RestaurantCard from '../components/restaurants/RestaurantCard';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Mock restaurant data - in a real app, this would come from Firebase
  useEffect(() => {
    const mockRestaurants = [
      {
        id: '1',
        name: 'Bella Italia',
        cuisine: 'Italian',
        rating: 4.8,
        deliveryTime: 25,
        distance: 1.2,
        deliveryFee: 2.99,
        isOpen: true,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '2',
        name: 'Dragon Palace',
        cuisine: 'Chinese',
        rating: 4.6,
        deliveryTime: 30,
        distance: 2.1,
        deliveryFee: 3.49,
        isOpen: true,
        image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '3',
        name: 'Burger Junction',
        cuisine: 'American',
        rating: 4.4,
        deliveryTime: 20,
        distance: 0.8,
        deliveryFee: 1.99,
        isOpen: true,
        image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '4',
        name: 'Spice Garden',
        cuisine: 'Indian',
        rating: 4.7,
        deliveryTime: 35,
        distance: 2.8,
        deliveryFee: 3.99,
        isOpen: false,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '5',
        name: 'Sushi Zen',
        cuisine: 'Japanese',
        rating: 4.9,
        deliveryTime: 40,
        distance: 3.2,
        deliveryFee: 4.49,
        isOpen: true,
        image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '6',
        name: 'Taco Fiesta',
        cuisine: 'Mexican',
        rating: 4.3,
        deliveryTime: 25,
        distance: 1.5,
        deliveryFee: 2.49,
        isOpen: true,
        image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ];
    setRestaurants(mockRestaurants);
  }, []);

  const cuisines = ['all', 'Italian', 'Chinese', 'American', 'Indian', 'Japanese', 'Mexican'];

  const filteredRestaurants = restaurants
    .filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(restaurant => 
      selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return a.deliveryTime - b.deliveryTime;
        case 'distance':
          return a.distance - b.distance;
        case 'deliveryFee':
          return a.deliveryFee - b.deliveryFee;
        default:
          return 0;
      }
    });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order from Local <span className="text-primary-500">Restaurants</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing food from restaurants near you and track your order in real-time.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants or cuisines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine === 'all' ? 'All Cuisines' : cuisine}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="deliveryTime">Sort by Delivery Time</option>
                  <option value="distance">Sort by Distance</option>
                  <option value="deliveryFee">Sort by Delivery Fee</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Delivering to your location</span>
            </div>
          </div>

          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default RestaurantsPage;
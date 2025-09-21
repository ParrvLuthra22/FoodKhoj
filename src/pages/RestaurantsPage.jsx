import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Utensils } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import MenuItemCard from '../components/restaurants/MenuItemCard';
import { mockRestaurants, mockMenuItems } from '../data/mockData';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [searchType, setSearchType] = useState('all'); 
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setRestaurants(mockRestaurants);
    setMenuItems(mockMenuItems);
  }, []);

  useEffect(() => {
    const searchFromParams = searchParams.get('search');
    if (searchFromParams) {
      setSearchTerm(searchFromParams);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const cuisines = ['all', 'Italian', 'Chinese', 'American', 'Indian', 'Kebabs & Rolls', 'Mughlai'];

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

  const filteredMenuItems = menuItems
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => 
      selectedCuisine === 'all' || item.cuisine === selectedCuisine
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          const restaurantA = restaurants.find(r => r.id === a.restaurantId);
          const restaurantB = restaurants.find(r => r.id === b.restaurantId);
          return (restaurantB?.rating || 0) - (restaurantA?.rating || 0);
        case 'deliveryTime':
          const restaurantA2 = restaurants.find(r => r.id === a.restaurantId);
          const restaurantB2 = restaurants.find(r => r.id === b.restaurantId);
          return (restaurantA2?.deliveryTime || 0) - (restaurantB2?.deliveryTime || 0);
        case 'distance':
          const restaurantA3 = restaurants.find(r => r.id === a.restaurantId);
          const restaurantB3 = restaurants.find(r => r.id === b.restaurantId);
          return (restaurantA3?.distance || 0) - (restaurantB3?.distance || 0);
        case 'deliveryFee':
          const restaurantA4 = restaurants.find(r => r.id === a.restaurantId);
          const restaurantB4 = restaurants.find(r => r.id === b.restaurantId);
          return (restaurantA4?.deliveryFee || 0) - (restaurantB4?.deliveryFee || 0);
        default:
          return 0;
      }
    });

  const restaurantsFromMenuItems = filteredMenuItems.reduce((acc, item) => {
    const restaurant = restaurants.find(r => r.id === item.restaurantId);
    if (restaurant && !acc.find(r => r.id === restaurant.id)) {
      acc.push(restaurant);
    }
    return acc;
  }, []);

  const getDisplayResults = () => {
    if (searchType === 'restaurants') {
      return { restaurants: filteredRestaurants, menuItems: [] };
    } else if (searchType === 'food') {
      return { restaurants: [], menuItems: filteredMenuItems };
    } else {
      const allRestaurants = [...filteredRestaurants, ...restaurantsFromMenuItems];
      const uniqueRestaurants = allRestaurants.filter((restaurant, index, self) => 
        index === self.findIndex(r => r.id === restaurant.id)
      );
      return { restaurants: uniqueRestaurants, menuItems: filteredMenuItems };
    }
  };

  const { restaurants: displayRestaurants, menuItems: displayMenuItems } = getDisplayResults();

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

          {/* Search + Filters */}
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for dishes or restaurants"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Search Type Tabs */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setSearchType('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'all'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSearchType('restaurants')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'restaurants'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Restaurants
                </button>
                <button
                  onClick={() => setSearchType('food')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'food'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Utensils className="h-4 w-4 inline mr-1" />
                  Food
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Results Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {searchType === 'food' 
                ? `${displayMenuItems.length} Food Item${displayMenuItems.length !== 1 ? 's' : ''} Found`
                : searchType === 'restaurants'
                ? `${displayRestaurants.length} Restaurant${displayRestaurants.length !== 1 ? 's' : ''} Found`
                : `${displayRestaurants.length + displayMenuItems.length} Result${(displayRestaurants.length + displayMenuItems.length) !== 1 ? 's' : ''} Found`
              }
            </h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>Delivering to your location</span>
            </div>
          </div>

          {displayRestaurants.length === 0 && displayMenuItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Restaurants Section */}
              {displayRestaurants.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary-500" />
                    Restaurants ({displayRestaurants.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayRestaurants.map(restaurant => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                </div>
              )}

              {/* Food Items Section */}
              {displayMenuItems.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-primary-500" />
                    Food Items ({displayMenuItems.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayMenuItems.map(item => (
                      <div key={item.id} className="relative">
                        <MenuItemCard item={item} />
                        <div className="mt-2 text-sm text-gray-500 text-center">
                          from <span className="font-medium">{item.restaurantName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default RestaurantsPage;
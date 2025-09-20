import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Utensils } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import MenuItemCard from '../components/restaurants/MenuItemCard';
import { convertAndFormatUSDToINR } from '../utils/currencyConverter';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [searchType, setSearchType] = useState('all'); // 'all', 'restaurants', 'food'
  const [searchParams, setSearchParams] = useSearchParams();

  // Mock restaurant data with INR prices
  useEffect(() => {
    const mockRestaurants = [
      {
        id: '1',
        name: 'Billus Hut',
        cuisine: 'Italian',
        rating: 4.8,
        deliveryTime: 25,
        distance: 1.2,
        deliveryFee: 2.99,
        deliveryFeeINR: convertAndFormatUSDToINR(2.99),
        isOpen: true,
        image: 'https://content3.jdmagicbox.com/v2/comp/delhi/y3/011pxx11.xx11.210217145948.z1y3/catalogue/-s2g3167hz7.jpg'
      },
      {
        id: '2',
        name: 'Kings Kitchen',
        cuisine: 'Chinese',
        rating: 4.6,
        deliveryTime: 30,
        distance: 2.1,
        deliveryFee: 3.49,
        deliveryFeeINR: convertAndFormatUSDToINR(3.49),
        isOpen: true,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ykWNVwwmdSeI3zcmb82qgS2UJCNMNYHwtw&s'
      },
      {
        id: '3',
        name: 'Burger King',
        cuisine: 'American',
        rating: 4.4,
        deliveryTime: 20,
        distance: 0.8,
        deliveryFee: 1.99,
        deliveryFeeINR: convertAndFormatUSDToINR(1.99),
        isOpen: true,
        image: 'https://play-lh.googleusercontent.com/LajmY4cNQiCJ1xmLt-BoJjG-ChCmZncapS0KR2PzwB-8UeypsKMH4RYfw36xi-MXSj2b'
      },
      {
        id: '4',
        name: 'Spice Hub',
        cuisine: 'Indian',
        rating: 4.7,
        deliveryTime: 35,
        distance: 2.8,
        deliveryFee: 3.99,
        deliveryFeeINR: convertAndFormatUSDToINR(3.99),
        isOpen: false,
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/72/7b/29/spice-hub.jpg?w=900&h=-1&s=1'
      },
      {
        id: '5',
        name: 'Khan Chacha',
        cuisine: 'Kebabs & Rolls',
        rating: 4.5,
        deliveryTime: 28,
        distance: 1.5,
        deliveryFee: 2.50,
        deliveryFeeINR: convertAndFormatUSDToINR(2.50),
        isOpen: true,
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '6',
        name: 'Karim\'s',
        cuisine: 'Mughlai',
        rating: 4.3,
        deliveryTime: 32,
        distance: 2.3,
        deliveryFee: 3.25,
        deliveryFeeINR: convertAndFormatUSDToINR(3.25),
        isOpen: true,
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ];

    // Mock menu items for all restaurants
    const mockMenuItems = [
      // Billus Hut (Italian)
      {
        id: '1-1',
        name: 'White Sauce Pasta',
        description: 'Creamy white sauce pasta with parmesan cheese',
        price: 12.99,
        priceINR: convertAndFormatUSDToINR(12.99),
        category: 'Pasta',
        restaurantId: '1',
        restaurantName: 'Billus Hut',
        cuisine: 'Italian',
        image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: '1-2',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 15.99,
        priceINR: convertAndFormatUSDToINR(15.99),
        category: 'Pizza',
        restaurantId: '1',
        restaurantName: 'Billus Hut',
        cuisine: 'Italian',
        image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: '1-3',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing and croutons',
        price: 8.99,
        priceINR: convertAndFormatUSDToINR(8.99),
        category: 'Salad',
        restaurantId: '1',
        restaurantName: 'Billus Hut',
        cuisine: 'Italian',
        image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      // Kings Kitchen (Chinese)
      {
        id: '2-1',
        name: 'Chicken Fried Rice',
        description: 'Stir-fried rice with chicken, vegetables, and soy sauce',
        price: 11.99,
        priceINR: convertAndFormatUSDToINR(11.99),
        category: 'Rice',
        restaurantId: '2',
        restaurantName: 'Kings Kitchen',
        cuisine: 'Chinese',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: '2-2',
        name: 'Sweet and Sour Chicken',
        description: 'Crispy chicken with sweet and sour sauce',
        price: 14.99,
        priceINR: convertAndFormatUSDToINR(14.99),
        category: 'Main Course',
        restaurantId: '2',
        restaurantName: 'Kings Kitchen',
        cuisine: 'Chinese',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: '2-3',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy spring rolls filled with fresh vegetables',
        price: 6.99,
        priceINR: convertAndFormatUSDToINR(6.99),
        category: 'Appetizer',
        restaurantId: '2',
        restaurantName: 'Kings Kitchen',
        cuisine: 'Chinese',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      // Burger King (American)
      {
        id: '3-1',
        name: 'Whopper',
        description: 'Flame-grilled beef patty with lettuce, tomato, and mayo',
        price: 8.99,
        priceINR: convertAndFormatUSDToINR(8.99),
        category: 'Burger',
        restaurantId: '3',
        restaurantName: 'Burger King',
        cuisine: 'American',
        image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: '3-2',
        name: 'Chicken Nuggets',
        description: 'Crispy chicken nuggets served with dipping sauce',
        price: 7.99,
        priceINR: convertAndFormatUSDToINR(7.99),
        category: 'Appetizer',
        restaurantId: '3',
        restaurantName: 'Burger King',
        cuisine: 'American',
        image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: '3-3',
        name: 'French Fries',
        description: 'Golden crispy french fries',
        price: 4.99,
        priceINR: convertAndFormatUSDToINR(4.99),
        category: 'Side',
        restaurantId: '3',
        restaurantName: 'Burger King',
        cuisine: 'American',
        image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      // Spice Hub (Indian)
      {
        id: '4-1',
        name: 'Butter Chicken',
        description: 'Tender chicken in rich tomato and cream sauce',
        price: 16.99,
        priceINR: convertAndFormatUSDToINR(16.99),
        category: 'Main Course',
        restaurantId: '4',
        restaurantName: 'Spice Hub',
        cuisine: 'Indian',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: '4-2',
        name: 'Dal Makhani',
        description: 'Creamy black lentils cooked with butter and cream',
        price: 12.99,
        priceINR: convertAndFormatUSDToINR(12.99),
        category: 'Main Course',
        restaurantId: '4',
        restaurantName: 'Spice Hub',
        cuisine: 'Indian',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: '4-3',
        name: 'Naan Bread',
        description: 'Soft and fluffy traditional Indian bread',
        price: 3.99,
        priceINR: convertAndFormatUSDToINR(3.99),
        category: 'Bread',
        restaurantId: '4',
        restaurantName: 'Spice Hub',
        cuisine: 'Indian',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      },
      // Khan Chacha (Kebabs & Rolls)
      {
        id: '5-1',
        name: 'Chicken Seekh Kebab',
        description: 'Spiced minced chicken grilled on skewers',
        price: 13.99,
        priceINR: convertAndFormatUSDToINR(13.99),
        category: 'Kebab',
        restaurantId: '5',
        restaurantName: 'Khan Chacha',
        cuisine: 'Kebabs & Rolls',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: true
      },
      {
        id: '5-2',
        name: 'Mutton Roll',
        description: 'Spiced mutton wrapped in paratha',
        price: 9.99,
        priceINR: convertAndFormatUSDToINR(9.99),
        category: 'Roll',
        restaurantId: '5',
        restaurantName: 'Khan Chacha',
        cuisine: 'Kebabs & Rolls',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: true
      },
      {
        id: '5-3',
        name: 'Paneer Tikka',
        description: 'Grilled cottage cheese with spices',
        price: 11.99,
        priceINR: convertAndFormatUSDToINR(11.99),
        category: 'Kebab',
        restaurantId: '5',
        restaurantName: 'Khan Chacha',
        cuisine: 'Kebabs & Rolls',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: true
      },
      // Karim's (Mughlai)
      {
        id: '6-1',
        name: 'Mutton Biryani',
        description: 'Fragrant basmati rice with spiced mutton',
        price: 18.99,
        priceINR: convertAndFormatUSDToINR(18.99),
        category: 'Biryani',
        restaurantId: '6',
        restaurantName: 'Karim\'s',
        cuisine: 'Mughlai',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: true
      },
      {
        id: '6-2',
        name: 'Chicken Korma',
        description: 'Mild curry with chicken in creamy sauce',
        price: 15.99,
        priceINR: convertAndFormatUSDToINR(15.99),
        category: 'Main Course',
        restaurantId: '6',
        restaurantName: 'Karim\'s',
        cuisine: 'Mughlai',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: '6-3',
        name: 'Raita',
        description: 'Cool yogurt with cucumber and mint',
        price: 4.99,
        priceINR: convertAndFormatUSDToINR(4.99),
        category: 'Side',
        restaurantId: '6',
        restaurantName: 'Karim\'s',
        cuisine: 'Mughlai',
        image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isVegetarian: true,
        isSpicy: false
      }
    ];

    setRestaurants(mockRestaurants);
    setMenuItems(mockMenuItems);
  }, []);

  // Handle search parameter from navbar (kept for deep-link support, but no UI)
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
          // For menu items, we'll use restaurant rating as proxy
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

  // Get unique restaurants from filtered menu items
  const restaurantsFromMenuItems = filteredMenuItems.reduce((acc, item) => {
    const restaurant = restaurants.find(r => r.id === item.restaurantId);
    if (restaurant && !acc.find(r => r.id === restaurant.id)) {
      acc.push(restaurant);
    }
    return acc;
  }, []);

  // Combine results based on search type
  const getDisplayResults = () => {
    if (searchType === 'restaurants') {
      return { restaurants: filteredRestaurants, menuItems: [] };
    } else if (searchType === 'food') {
      return { restaurants: restaurantsFromMenuItems, menuItems: filteredMenuItems };
    } else {
      // 'all' - show both restaurants and food items
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
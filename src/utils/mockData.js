const generateRandomPoint = (center, radius = 0.01) => {
    const randomAngle = Math.random() * Math.PI * 2 
    const randomRadius = Math.random() * radius 
    
    const offsetLat = randomRadius * Math.cos(randomAngle)
    const offsetLng = randomRadius * Math.sin(randomAngle)
    
    return {
      lat: center.lat + offsetLat,
      lng: center.lng + offsetLng
    }
  }
  
  export const generateFakeRoute = (start, end, waypoints = 8) => {
    const route = []
    
    route.push(start)
    for (let i = 1; i <= waypoints; i++) {
      const fraction = i / (waypoints + 1)
      const lat = start.lat + (end.lat - start.lat) * fraction
      const lng = start.lng + (end.lng - start.lng) * fraction
      
      const jitter = 0.0005 * Math.sin(i * Math.PI) 
      
      route.push({
        lat: lat + jitter,
        lng: lng + jitter * 2
      })
    }
    
    route.push(end)
    
    return route
  }
  
  export const restaurants = [
    {
      id: 'rest1',
      name: 'Shutup & Eat',
      image: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: { lat: 40.7128, lng: -74.0060 }, // NYC
      rating: 4.7,
      cuisine: 'Indian',
      priceRange: '$$'
    },
    {
      id: 'rest2',
      name: 'Burger King',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: { lat: 40.7112, lng: -74.0125 },
      rating: 4.5,
      cuisine: 'American',
      priceRange: '$$'
    },
    {
      id: 'rest3',
      name: 'Billus Kitchen',
      image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      location: { lat: 40.7200, lng: -74.0090 },
      rating: 4.8,
      cuisine: 'Italian',
      priceRange: '$$$'
    }
  ]
  
  export const mockOrders = [
    {
      id: 'order1',
      restaurant: restaurants[0],
      items: [
        { name: 'Butter Chicken', quantity: 1, price: 15.99 },
        { name: 'Garlic Naan', quantity: 2, price: 3.99 },
        { name: 'Mango Lassi', quantity: 1, price: 4.99 }
      ],
      status: 'preparing', 
      orderedAt: new Date(Date.now() - 25 * 60000), // 25 minutes ago
      estimatedDelivery: new Date(Date.now() + 20 * 60000), // 20 minutes from now
      deliveryAddress: {
        address: '123 Main St, New York, NY 10001',
        location: { lat: 40.7282, lng: -73.9942 }
      },
      driverName: 'Parrvesh Kumar',
      driverPhone: '+91 6969696969',
      driverPhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      total: 34.95,
      route: generateFakeRoute(
        restaurants[0].location,
        { lat: 40.7282, lng: -73.9942 }
      )
    },
    {
      id: 'order2',
      restaurant: restaurants[1],
      items: [
        { name: 'Double Cheeseburger', quantity: 2, price: 8.99 },
        { name: 'Fries (Large)', quantity: 1, price: 3.99 },
        { name: 'Coke (Large)', quantity: 1, price: 2.50 },
        { name: 'Chocolate Milkshake', quantity: 2, price: 4.99 }
      ],
      status: 'on-the-way',
      orderedAt: new Date(Date.now() - 35 * 60000), // 35 minutes ago
      estimatedDelivery: new Date(Date.now() + 10 * 60000), // 10 minutes from now
      deliveryAddress: {
        address: '123 Netaji Subhas Palace, New Delhi, Delhi 110034',
        location: { lat: 40.7580, lng: -73.9755 }
      },
      driverName: 'Parrv Luthra',
      driverPhone: '91 1234567890',
      driverPhoto: 'https://t4.ftcdn.net/jpg/01/79/99/99/360_F_179999999_1mzWKikF52md2KxaKIh2yPC47A365Jtx.jpg',
      total: 45.95
    },
    {
      id: 'order3',
      restaurant: restaurants[2],
      items: [
        { name: 'Fettuccine Alfredo', quantity: 1, price: 16.99 },
        { name: 'Caprese Salad', quantity: 1, price: 8.99 },
        { name: 'Tiramisu', quantity: 1, price: 7.99 }
      ],
      status: 'ordered',
      orderedAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      estimatedDelivery: new Date(Date.now() + 45 * 60000), // 45 minutes from now
      deliveryAddress: {
        address: '789 Broadway, New York, NY 10003',
        location: { lat: 40.7352, lng: -73.9911 }
      },
      driverName: 'Not assigned',
      driverPhone: '',
      driverPhoto: '',
      total: 33.97
    }
  ]
  
  // Get current driver location based on order progress
  export const getCurrentDriverLocation = (order) => {
    if (!order || !order.route || order.status === 'ordered' || order.status === 'delivered') {
      return order?.restaurant?.location || { lat: 40.7128, lng: -74.0060 }
    }
    
    const routeLength = order.route.length
    let progressIndex = 0
    
    // Determine how far along the route the driver should be based on order status
    if (order.status === 'preparing') {
      // Driver is at the restaurant
      progressIndex = 0
    } else if (order.status === 'on-the-way') {
      // Calculate how far along the route the driver is based on time
      const totalDeliveryTime = order.estimatedDelivery - order.orderedAt
      const elapsedTime = Date.now() - order.orderedAt
      const progressPercent = Math.min(elapsedTime / totalDeliveryTime, 0.95)
      
      progressIndex = Math.floor(progressPercent * (routeLength - 1))
    }
    
    return order.route[progressIndex]
  }
  
  // Blog posts
  export const blogPosts = [
    {
      id: 'blog1',
      title: '5 Ways to Get the Most Out of Food Delivery Apps',
      excerpt: 'Learn how to save money and get the best service when ordering food online.',
      image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Maya Patel',
      date: 'May 15, 2023',
      readTime: '5 min read',
      categories: ['Tips', 'Savings']
    },
    {
      id: 'blog2',
      title: 'Behind the Scenes: A Day in the Life of a Delivery Driver',
      excerpt: "Discover what it's really like to be a food delivery driver in the gig economy.",
      image: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'James Wilson',
      date: 'June 2, 2023',
      readTime: '8 min read',
      categories: ['Stories', 'Careers']
    },
    {
      id: 'blog3',
      title: 'The Technology Behind Real-Time Food Delivery Tracking',
      excerpt: 'A deep dive into the sophisticated systems that power modern delivery tracking.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Dr. Aisha Johnson',
      date: 'July 10, 2023',
      readTime: '10 min read',
      categories: ['Technology', 'Innovation']
    },
    {
      id: 'blog4',
      title: 'Sustainable Food Delivery: Reducing Waste and Carbon Footprint',
      excerpt: 'How the industry is working to become more environmentally friendly.',
      image: 'https://images.pexels.com/photos/5945559/pexels-photo-5945559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Leo Richards',
      date: 'August 22, 2023',
      readTime: '7 min read',
      categories: ['Sustainability', 'Future']
    }
  ]
  
  // FAQ data
  export const faqData = [
    {
      question: 'How does real-time tracking work?',
      answer: 'Our real-time tracking system uses GPS technology to monitor your delivery driver\'s location. The app updates every few seconds to give you the most accurate location data possible, allowing you to see exactly where your food is and when it will arrive.'
    },
    {
      question: 'What happens if my food arrives late?',
      answer: 'If your food arrives later than the estimated delivery time, you may be eligible for a partial or full refund depending on the circumstances. Contact our customer support team through the app for assistance with late deliveries.'
    },
    {
      question: 'Can I change my delivery address after placing an order?',
      answer: 'Address changes can only be made before the restaurant begins preparing your food. If you need to change your delivery address, contact customer support immediately. Changes after food preparation has begun may not be possible.'
    },
    {
      question: 'How accurate is the estimated delivery time?',
      answer: 'Our delivery time estimates take into account current traffic conditions, distance, weather, and historical delivery data. While we strive for accuracy, unexpected factors can occasionally affect delivery times. The app will notify you of any significant changes to your estimated delivery time.'
    },
    {
      question: 'Can I add instructions for the delivery driver?',
      answer: 'Yes! You can add specific delivery instructions when placing your order. Look for the "Delivery Instructions" field during checkout where you can specify details like gate codes, building entrances, or preferred drop-off locations.'
    },
    {
      question: 'Is it possible to schedule an order for later?',
      answer: 'Absolutely! Our app allows you to schedule orders up to 7 days in advance. Simply select "Schedule for Later" during checkout and choose your preferred date and time. You\'ll receive tracking information once the restaurant begins preparing your order.'
    }
  ]
  
  // Team members
  export const teamMembers = [
    {
      name: 'Rajiv Sharma',
      role: 'Founder & CEO',
      bio: 'Former Google Maps engineer with a passion for food and technology.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Anika Patel',
      role: 'CTO',
      bio: 'Tech innovator with 15+ years of experience in location-based services.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Head of Operations',
      bio: 'Restaurant industry veteran focused on creating seamless delivery experiences.',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      name: 'Sarah Kim',
      role: 'Lead Designer',
      bio: 'Award-winning UX/UI designer dedicated to intuitive user experiences.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]
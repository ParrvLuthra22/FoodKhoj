import React from 'react';
// import HeroSection from '../components/common/HeroSection';
// import OrderTrackingPreview from '../components/home/OrderTrackingPreview';
// import KeySellingPoints from '../components/home/KeySellingPoints';

const Home = () => {
  return (
    <div>
      <HeroSection 
        title="Track Your Food Delivery in Real-Time"
        subtitle="Know exactly where your meal is and when it will arrive at your doorstep"
        imageUrl="/api/placeholder/1600/800"
        showSearchBar={true}
      />
      <OrderTrackingPreview />
      <KeySellingPoints />
    </div>
  );
};

export default Home;
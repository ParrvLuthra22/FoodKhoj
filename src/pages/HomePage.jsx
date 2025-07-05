import React from 'react';
import HeroSection from '../components/home/HeroSection';
import TrackingPreview from '../components/home/TrackingPreview';
import FeatureHighlights from '../components/home/FeatureHighlights';
import TestimonialsSection from '../components/home/TestimonialsSection';

function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrackingPreview />
      <FeatureHighlights />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
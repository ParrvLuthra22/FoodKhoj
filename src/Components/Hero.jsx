import React from 'react';

const Hero = ({ title, subtitle, image, showButton = true, buttonText = "Track Your Order", buttonLink = "#trackOrder" }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-foodkhoj-cream py-12 md:py-20">
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foodkhoj-navy">
              {title || "Track Your Food Delivery In Real-Time"}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              {subtitle || "Know exactly where your food is, from restaurant to doorstep. No more wondering when your meal will arrive."}
            </p>
            {showButton && (
              <a href={buttonLink} className="btn btn-primary btn-lg">
                {buttonText}
              </a>
            )}
          </div>
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl relative">
              <img
                src={image || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt="Food Delivery"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                <div className="bg-white rounded-lg p-4 shadow-lg inline-flex items-center space-x-3">
                  <div className="pulse-dot">
                    <span></span>
                  </div>
                  <span className="text-sm font-medium">Live Tracking Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-foodkhoj-yellow rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-foodkhoj-red rounded-full opacity-10 blur-3xl"></div>
    </div>
  );
};

export default Hero;

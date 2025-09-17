import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Order Food & <span className="text-primary-500">Track Delivery</span> in Real-Time
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Browse menus from local restaurants, place your order, and watch your food journey to your doorstep with live tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/restaurants" className="btn btn-primary text-base px-6 py-3">
                <MapPin className="mr-2 h-5 w-5" />
                Order Now
              </Link>
              <Link to="/track" className="btn btn-outline text-base px-6 py-3">
                Track Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center">
                <div className="bg-secondary-500 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">30 min or less</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-accent-500 p-2 rounded-full mr-3">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Live Tracking</p>
                  <p className="text-sm text-gray-600">Real-time updates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-medium relative animate-float">
            <img
              src="https://lh3.googleusercontent.com/rd-gg-dl/AJfQ9KTPFVx05x4VyeJeB0GLMUP8WZEWSYdDpfpQEZdO_irup_ZqTSTKTA-c-gzuwNH-hrmBih1yRKxWt1cA4_lNexN5cl_N6E5t47-Sws_F7KD3h7mQXP893qYKHLacG_XEqEiIhryFxj6fjynvOeptGTu_mQQAZ-FXqVk6OuUjWQNeGAPL221OthW8oavqViMLTuct7FTPyr80AX2ktaz5rDt9ozhcv5HR4VFqU-L10Lvs6D2VO05AcUocJMp8H1GLyVy9p7UBRQqxrqXV8GKulJMDNxZn_trFsmQVOVmhMXC2iu6xvWB7noQDjzoqwbl18Ijpnmjgy3sJtqqJiC-6a3uEFB8-Lrh4KrkM0BlxBI4bzK6APzSWAQs2B63MONJP1RRnmaYM5NWK-yosziep9JoQNlHxSz2qVaCMFo0uJcmR85p5J8rhmNW4y0PbB1U0N8-EA-7nB9CuDvk_9ivp3rkscwHDXtdGAe_9ecxiZCO9_ICe0kcxgWL_vjEfE2O27YvL6dEAnq7DB-zhMljTK3dQTUAF5iBhq5Tv3XRfceUUpeEnLbum43GEoijR9ZxklI3asRNZwV51IW7FI3YuC1D7_OuTCCQz-YthQ2VZOVN8lP8H3j8nw6bpifsHdPm9iZAry1me14slkWYrQujj3Uh_nQtwwvZzV7FS1DsYUqwsJLj6nh42qZQbzWbSsN0vKB472-O1Dzkd9SbNNpZqf4293_5_OKacLSmm-7Nq38nFK_0eF9DuJXEbhEYpSi64llXxsY32-s6mIVXuzJ3pJ5u83RrdFil7I1PpEKSDD9Qmvz-iwyA8MIOuCZoyf_Ctq-nvnVduYFD3-D-dPzni-O-Sverplij9notoys1tlWDIYXBZaqt5_MhzgA9TsFvoE5nFt15IRPlT-_wYMfXAbmeFMeJV_IP_zAbcQodjJKDkDJDv7bFrK_yh94kybEFKntrzR3Xvd-YAAid5MmiDZNs4LFfZRDrZ9mYkbacPxvjYNBJ_QxAXsZxEBprBhNfFqwZjHmq-8k6_mWPkr_KqLG55DDkyeFOrAtoGp0SpdnwnDsdHOzqLHYvqfLrRTZKt0bfawoDv_bg1LTxT-MmB-EChzmXz8_wadW5AkQk5Ev-iPQCbUhuYiIW-_uAHTczmKFqbA1jg7PB0EWNYyGdPLAN-h5GYcxJFy8HmMA=s1024"
              alt="Food delivery tracking"
              className="w-full h-auto rounded-2xl"
            />
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-soft px-4 py-2 flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2 animate-pulse"></div>
              <span className="text-sm font-medium">Live Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
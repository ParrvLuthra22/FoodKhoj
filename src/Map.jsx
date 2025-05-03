"use client"

import { useEffect, useRef, useState } from "react"

function Map({ deliveryStatus = "on-the-way" }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock data for demonstration
  const restaurantLocation = { lat: 40.712776, lng: -74.005974 } // New York
  const deliveryLocation = { lat: 40.73061, lng: -73.935242 } // Brooklyn
  const currentLocation = { lat: 40.722776, lng: -73.985974 } // Somewhere in between

  useEffect(() => {
    // This would normally load the Google Maps API
    // For this demo, we'll just simulate a map with a placeholder
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg">
      {loading ? (
        <div className="bg-gray-200 animate-pulse h-96 w-full flex items-center justify-center">
          <p className="text-gray-500">Loading map...</p>
        </div>
      ) : (
        <div className="relative">
          <img src="/placeholder.svg?height=400&width=800" alt="Map placeholder" className="w-full h-96 object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
              <div className="flex items-center mb-2">
                <div
                  className={`h-3 w-3 rounded-full ${deliveryStatus === "on-the-way" ? "bg-orange-500" : "bg-gray-300"} mr-2`}
                ></div>
                <span className="font-medium">Your order is on the way!</span>
              </div>
              <div className="text-sm text-gray-600">Estimated arrival: 25 minutes</div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Order #FD12345</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              deliveryStatus === "on-the-way"
                ? "bg-orange-100 text-orange-800"
                : deliveryStatus === "delivered"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
            }`}
          >
            {deliveryStatus === "on-the-way"
              ? "On the way"
              : deliveryStatus === "delivered"
                ? "Delivered"
                : "Preparing"}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Restaurant</p>
              <p className="font-medium">Tasty Bites Restaurant</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">25 minutes (by 7:45 PM)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map

import React from 'react';
import { useLoadScript, GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { MapPin, AlertCircle } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const deliveryPath = [
  { lat: 40.7128, lng: -74.006 },
  { lat: 40.7138, lng: -74.004 },
  { lat: 40.7148, lng: -74.002 },
  { lat: 40.7158, lng: -74.0 },
  { lat: 40.7168, lng: -73.998 },
];

const currentPosition = { lat: 40.7148, lng: -74.002 };

function MapComponent() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  // Check if API key is properly configured (not empty, undefined, or placeholder)
  const isValidApiKey = apiKey && 
    apiKey !== 'your_google_maps_api_key_here' && 
    apiKey !== 'your_actual_google_maps_api_key_here' &&
    apiKey.trim() !== '';

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: isValidApiKey ? apiKey : '',
  });

  // Show configuration message if API key is not properly set
  if (!isValidApiKey) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg h-[400px] border border-gray-200">
        <div className="text-center p-8 max-w-md">
          <div className="bg-amber-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Google Maps Setup Required</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            To display the delivery tracking map, please configure your Google Maps API key in the environment variables.
          </p>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Steps to configure:</p>
            <ol className="text-sm text-gray-600 text-left space-y-1">
              <li>1. Get an API key from Google Cloud Console</li>
              <li>2. Enable Maps JavaScript API</li>
              <li>3. Update VITE_GOOGLE_MAPS_API_KEY in .env</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-lg h-[400px] border border-red-200">
        <div className="text-center p-8">
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Map Loading Error</h3>
          <p className="text-red-600 mb-2">Unable to load Google Maps</p>
          <p className="text-sm text-red-500">Please check your API key configuration</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-[400px] border border-blue-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-500 mx-auto mb-4"></div>
          <p className="text-blue-700 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -80 }],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#e9e9e9' }, { lightness: 17 }],
            },
          ],
        }}
      >
        {/* Restaurant/Start Location */}
        <Marker 
          position={deliveryPath[0]}
          options={{
            icon: {
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              fillColor: '#ef4444',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#ffffff',
              scale: 1.5,
            }
          }}
        />
        
        {/* Destination */}
        <Marker 
          position={deliveryPath[deliveryPath.length - 1]}
          options={{
            icon: {
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              fillColor: '#22c55e',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#ffffff',
              scale: 1.5,
            }
          }}
        />
        
        {/* Current Delivery Position */}
        <Marker 
          position={currentPosition}
          options={{
            icon: {
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              fillColor: '#3b82f6',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: '#ffffff',
              scale: 1.8,
            }
          }}
        />
        
        {/* Delivery Route */}
        <Polyline
          path={deliveryPath}
          options={{
            strokeColor: '#2EC4B6',
            strokeOpacity: 0.8,
            strokeWeight: 4,
            geodesic: true,
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
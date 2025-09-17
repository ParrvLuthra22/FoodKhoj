import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Truck } from 'lucide-react';

function MapComponent() {
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const deliverySteps = [
    { id: 1, name: 'Restaurant', description: 'Bella Italia', status: 'completed' },
    { id: 2, name: 'Main Street', description: 'Heading north', status: 'current' },
    { id: 3, name: 'Oak Avenue', description: 'Turn right', status: 'pending' },
    { id: 4, name: 'Your Location', description: '123 Main St, Apt 4B', status: 'pending' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (deliveryProgress < 25) setCurrentStep(0);
    else if (deliveryProgress < 50) setCurrentStep(1);
    else if (deliveryProgress < 75) setCurrentStep(2);
    else setCurrentStep(3);
  }, [deliveryProgress]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg h-[50vh] min-h-[350px] max-h-[500px] border border-gray-200 overflow-hidden flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary-500 rounded-full p-2 mr-3">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Live Delivery Tracking</h3>
              <p className="text-sm text-gray-600">Order #12345 • Mike Johnson</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 50 200 Q 150 150 250 100 Q 350 80 400 120"
            stroke="#3b82f6"
            strokeWidth="4"
            fill="none"
            strokeDasharray="8,4"
            className="opacity-60"
          />
          <path
            d="M 50 200 Q 150 150 250 100 Q 350 80 400 120"
            stroke="#10b981"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${deliveryProgress * 4} 1000`}
            className="transition-all duration-300"
          />
        </svg>

        <div className="absolute top-44 left-8">
          <div className="bg-red-500 rounded-full p-2 shadow-lg border-2 border-white">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="bg-white rounded px-2 py-1 text-xs font-medium shadow-md mt-1 whitespace-nowrap">
            Bella Italia
          </div>
        </div>

        <div 
          className="absolute transition-all duration-300 ease-linear"
          style={{
            left: `${Math.min(50 + (deliveryProgress * 3.5), 380)}px`,
            top: `${200 - (deliveryProgress * 0.8)}px`
          }}
        >
          <div className="bg-blue-500 rounded-full p-2 shadow-lg border-2 border-white animate-pulse">
            <Truck className="h-4 w-4 text-white" />
          </div>
          <div className="bg-white rounded px-2 py-1 text-xs font-medium shadow-md mt-1 whitespace-nowrap">
            Mike's Delivery
          </div>
        </div>

        <div className="absolute top-24 right-8">
          <div className="bg-green-500 rounded-full p-2 shadow-lg border-2 border-white">
            <MapPin className="h-4 w-4 text-white" />
          </div>
          <div className="bg-white rounded px-2 py-1 text-xs font-medium shadow-md mt-1 whitespace-nowrap">
            Your Location
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Delivery Progress</span>
              <span className="text-sm text-gray-600">{Math.round(deliveryProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${deliveryProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white flex-shrink-0">
        <div className="flex items-center justify-between text-sm">
          {deliverySteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                index <= currentStep 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <div className="text-center">
                <p className={`font-medium ${index <= currentStep ? 'text-green-600' : 'text-gray-600'}`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 flex-shrink-0">
        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Estimated arrival</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {deliveryProgress >= 100 ? 'Delivered!' : '12-15 min'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MapComponent;
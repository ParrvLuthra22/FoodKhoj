export function initializeTracking() {
  const trackingForm = document.getElementById('tracking-form');
  if (!trackingForm) return;

  trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = trackingForm.querySelector('input').value;
    updateTrackingStatus(orderId);
  });
}

function updateTrackingStatus(orderId) {
  // Mock tracking data
  const status = {
    status: 'on the way',
    estimatedTime: '15-20 min',
    distance: '2.5 km away'
  };

  const statusElement = document.getElementById('tracking-status');
  if (statusElement) {
    statusElement.innerHTML = `
      <div class="tracking-info">
        <p class="text-lg font-semibold">Status: <span class="text-primary-500">${status.status}</span></p>
        <p class="text-gray-600">Estimated arrival: ${status.estimatedTime}</p>
        <p class="text-gray-600">Distance: ${status.distance}</p>
      </div>
    `;
  }
}
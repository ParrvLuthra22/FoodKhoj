function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
      <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default FeatureCard

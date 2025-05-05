import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './Components/Common/NavBar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import OrderTracking from './pages/OrderTracking'
import ScrollToTop from './utils/ScrollToTop'
import { OrderProvider } from './Context/orderContext'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-4 border-primary-500 border-solid rounded-full animate-spin"></div>
          <h1 className="mt-4 text-xl font-bold text-primary-500">FoodKhoj</h1>
          <p className="text-sm text-gray-500 mt-2">Loading amazing food experiences...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <OrderProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/track/:orderId" element={<OrderTracking />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </OrderProvider>
    </Router>
  )
}

export default App
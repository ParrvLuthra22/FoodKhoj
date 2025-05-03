"use client"

import { useState } from "react"

function SearchBar() {
  const [orderNumber, setOrderNumber] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle order tracking logic here
    console.log("Tracking order:", orderNumber)
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          placeholder="Enter your order number"
          className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-r-md font-medium transition-colors"
        >
          Track Now
        </button>
      </form>
    </div>
  )
}

export default SearchBar

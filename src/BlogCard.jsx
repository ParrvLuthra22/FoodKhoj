import { Link } from "react-router-dom"

function BlogCard({ title, excerpt, image, date, author }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image || "/placeholder.svg?height=200&width=400"} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{author}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <Link to="#" className="text-orange-500 font-medium hover:text-orange-600">
          Read More →
        </Link>
      </div>
    </div>
  )
}

export default BlogCard

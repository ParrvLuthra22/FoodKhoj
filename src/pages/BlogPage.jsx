import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, ChevronRight, Search } from 'lucide-react';

function BlogPage() {
  const featuredPost = {
    id: 1,
    title: 'How Real-Time Food Tracking Is Changing The Delivery Industry',
    excerpt: "Whats next for food delivery tracking? Explore emerging technologies and trends shaping the future.",
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'June 15, 2023',
    author: 'Alex Johnson',
    category: 'Industry Trends',
  };

  const blogPosts = [
    {
      id: 2,
      title: '5 Ways to Get the Most Out of Your Food Delivery Tracking',
      excerpt: 'Learn how to maximize the benefits of real-time tracking to ensure your food arrives hot and on time, every time.',
      image: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'May 22, 2023',
      author: 'Priya Patel',
      category: 'Tips & Tricks',
    },
    {
      id: 3,
      title: 'The Technology Behind Accurate Food Delivery ETAs',
      excerpt: 'A deep dive into the complex algorithms and data points that help predict when your food will actually arrive.',
      image: 'https://images.pexels.com/photos/8063272/pexels-photo-8063272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'May 10, 2023',
      author: 'Miguel Sanchez',
      category: 'Technology',
    },
    {
      id: 4,
      title: 'How Restaurants Are Benefiting From Delivery Tracking',
      excerpt: 'Discover how restaurants are using delivery tracking to improve customer satisfaction and streamline operations.',
      image: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 28, 2023',
      author: 'Sarah Chen',
      category: 'Business',
    },
    {
      id: 5,
      title: 'The Psychology of Waiting: Why Tracking Matters',
      excerpt: 'Understanding the psychological aspects of waiting for food delivery and how tracking alleviates anxiety.',
      image: 'https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 15, 2023',
      author: 'David Kim',
      category: 'Psychology',
    },
    {
      id: 6,
      title: 'Future of Food Delivery: Predictions for 2024 and Beyond',
      excerpt: "What's next for food delivery tracking? Explore emerging technologies and trends shaping the future.",
      image: 'https://images.pexels.com/photos/5921857/pexels-photo-5921857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      date: 'April 3, 2023',
      author: 'Lisa Wong',
      category: 'Future Trends',
    },
  ];

  const categories = [
    'All Categories',
    'Industry Trends',
    'Tips & Tricks',
    'Technology',
    'Business',
    'Customer Stories',
    'Future Trends',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FoodKhoj <span className="text-primary-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Insights, tips, and industry news about food delivery tracking and the future of delivery services.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 h-full">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="mx-3">•</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-gray-500 text-sm">{featuredPost.author}</span>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <div className="hidden md:flex space-x-2">
                  {['All', 'Technology', 'Tips', 'Industry'].map((category, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        index === 0
                          ? 'bg-primary-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="card overflow-hidden transition-transform hover:-translate-y-1 duration-300">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="text-primary-500 font-medium">
                          {post.category}
                        </span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center">
                          <User className="h-3 w-3 text-gray-500 mr-1" />
                          <span className="text-gray-500 text-sm">{post.author}</span>
                        </div>
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center text-sm text-primary-500 font-medium hover:text-primary-600 transition-colors"
                        >
                          Read More
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button className="btn btn-outline">
                  Load More Articles
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              {/* Search */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Search Articles</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for articles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="card p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`flex items-center py-2 px-3 rounded-lg text-gray-700 hover:bg-gray-100 ${
                          index === 0 ? 'bg-primary-50 text-primary-500 font-medium' : ''
                        }`}
                      >
                        {category}
                        {index === 0 && <span className="ml-auto text-xs bg-primary-500 text-white rounded-full px-2 py-1">8</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="flex items-start group">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 rounded object-cover flex-shrink-0 mr-3"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 group-hover:text-primary-500 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {post.date}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-500">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-100 mb-8">
              Stay updated with the latest news, tips, and insights about food delivery tracking.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-primary-500 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
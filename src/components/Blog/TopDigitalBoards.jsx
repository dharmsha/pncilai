"use client";

import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Best Digital Boards for Teachers",
    excerpt: "Discover the best digital boards that are transforming classrooms and enhancing interactive learning experiences.",
    imageUrl: "./led.jpg",
    link: "https://blog.creatorsmind.co.in/top-10-best-digital-boards-for-teachers/",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Interactive Display Buying Guide",
    excerpt: "Essential factors to consider when choosing the perfect digital board for your classroom or office.",
    imageUrl: "./blog1.png",
    link: "https://blog.creatorsmind.co.in/top-10-best-digital-boards-for-teachers/",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Maximizing Classroom Engagement",
    excerpt: "How digital boards are revolutionizing teaching methods and student participation.",
    imageUrl: "blog2.png",
    link: "https://blog.creatorsmind.co.in/top-10-best-digital-boards-for-teachers/",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Future of Education Technology",
    excerpt: "Exploring emerging trends in EdTech and how digital boards are leading the transformation.",
    imageUrl: "blo3.png",
    link: "https://blog.creatorsmind.co.in/top-10-best-digital-boards-for-teachers/",
    readTime: "7 min read"
  }
];

const BlogSection = () => {
  const openBlog = (url) => {
    window.open(url, "_blank");
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Our Blog
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Latest insights and guides on educational technology
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-teal-400 mx-auto mt-8 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => openBlog(post.link)}
            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="bg-gray-900 rounded-2xl h-full flex flex-col">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                    {post.readTime}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openBlog(post.link);
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl font-bold hover:from-blue-700 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 flex items-center justify-center"
                >
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://blog.creatorsmind.co.in/top-10-best-digital-boards-for-teachers/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30"
        >
          View All Blog Posts
        </a>
      </div>
    </section>
  );
};

export default BlogSection;
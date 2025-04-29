import React from 'react';

const BlogPost = ({ title, excerpt, image, author, date, category }) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="transition-transform" 
        />
        <div>
          {category}
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <h3>{title}</h3>
        <p>{excerpt}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div>
              {author[0]}
            </div>
            <span>{author}</span>
          </div>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

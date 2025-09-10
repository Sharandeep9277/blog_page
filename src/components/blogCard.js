'use client';
import React from 'react';
import Tag from './buttons/tag';
import Image from 'next/image';

const BlogCard = ({ 
  post,
  className = "",
  onClick,
  activeTags = [],
  onTagClick,
  ...props 
}) => {
  // Fixed five tags that will always be shown
  const allTags = ['IT Consulting', 'Engineering', 'Branding', 'Design', 'Other'];
  
  // Format date to match your design (YYYY.MM.DD)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  const handleTagClick = (tag, e) => {
    e.stopPropagation(); // Prevent card click when clicking tag
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  if (!post) return null;

  return (
    <div 
      className={`blog-card ${className}`}
      onClick={handleCardClick}
      {...props}
    >
      <div className="blog-card-image-container">
        <Image
            width={411} height={308}
          className="blog-card-image" 
          src={post.thumbnail || "https://placehold.co/411x308"} 
          alt={post.title || "Blog post image"}
        />
      </div>
      <div className="blog-card-content">
        <div className="blog-card-header">
          <div className="blog-card-date">
            {formatDate(post.createdAt)}
          </div>
          <div className="blog-card-title">{post.title}</div>
        </div>
        <div className="blog-card-tags">
          {allTags.map((tag, index) => {
            // Check if this tag is in the post's tags array or in activeTags
            const isPostTag = post.tags?.includes(tag);
            const isActiveTag = activeTags.includes(tag);
            
            return (
              <Tag 
                key={index} 
                isActive={isPostTag || isActiveTag}
                onClick={(e) => handleTagClick(tag, e)}
              >
                {tag}
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
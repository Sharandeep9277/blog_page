'use client';

import React from 'react';

const Tag = ({ 
  children, 
  isActive = false, 
  className = "",
  ...props 
}) => {
  return (
    <div 
      className={`tag ${isActive ? 'tag-active' : 'tag-inactive'} ${className}`}
      {...props}
    >
      <div className="tag-text">
        {children}
      </div>
    </div>
  );
};

export default Tag;
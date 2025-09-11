'use client';

import React, { useState } from 'react';

const Button2 = ({ 
  children = "もっと見る", 
  variant = "default", 
  onClick,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTextColorClass = () => {
    if (variant === "hover" || isHovered) {
      return "text-willeder-red";
    }
    return "text-black";
  };

  const getSvgFillColor = () => {
    if (variant === "hover" || isHovered) {
      return "var(--color-willeder-red)";
    }
    return "var(--color-black)";
  };

  return (
    <button
      className={`btn-link-2 ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="btn-link-2-content">
        <div className={`btn-link-2-text ${getTextColorClass()}`}>
          {children}
        </div>
      </div>
      <div className="btn-link-2-icon">
        
        <div className="btn-link-2-icon-mobile">
          {variant === "hover" || isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281_mobile)">
                <path d="M25 9L9.375 -0.0931225C9.375 -0.0931225 13.7491 3.24482 13.7491 9C13.7491 14.7552 9.375 18.0931 9.375 18.0931L25 9Z" fill={getSvgFillColor()}/>
              </g>
              <defs>
                <clipPath id="clip0_6_1281_mobile">
                  <rect width="25" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1274_mobile)">
                <path d="M15.625 9L0 -0.0931225C0 -0.0931225 4.37406 3.24482 4.37406 9C4.37406 14.7552 0 18.0931 0 18.0931L15.625 9Z" fill={getSvgFillColor()}/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274_mobile">
                  <rect width="25" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>

        
        <div className="btn-link-2-icon-desktop">
          {variant === "hover" || isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281_pc)">
                <path d="M34 12L13 -0.124146C13 -0.124146 18.2487 4.32642 18.2487 12C18.2487 19.6735 13 24.1241 13 24.1241L34 12Z" fill={getSvgFillColor()}/>
              </g>
              <defs>
                <clipPath id="clip0_6_1281_pc">
                  <rect width="34" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1274_pc)">
                <path d="M21 12L0 -0.124146C0 -0.124146 5.24874 4.32642 5.24874 12C5.24874 19.6735 0 24.1241 0 24.1241L21 12Z" fill={getSvgFillColor()}/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274_pc">
                  <rect width="34" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default Button2;
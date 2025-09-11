'use client';
import Link from 'next/link';
import { useState } from 'react';

const Button1PC = ({ 
  text = "お問い合わせはこちら", 
  href = "/contact", 
  className = "",
  onClick,
  type = "button"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // If it's a form button (no href or href is "#"), render as button
  if (!href || href === "#") {
    return (
      <button 
        type={type}
        className={`btn-primary btn-primary-rose ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="btn-text">
          {text}
        </div>
        
        
        <div className="btn-icon-mobile">
          {isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281_mobile)">
                <path d="M25 9L9.375 -0.0931225C9.375 -0.0931225 13.7491 3.24482 13.7491 9C13.7491 14.7552 9.375 18.0931 9.375 18.0931L25 9Z" fill="white"/>
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
                <path d="M15.625 9L0 -0.0931225C0 -0.0931225 4.37406 3.24482 4.37406 9C4.37406 14.7552 0 18.0931 0 18.0931L15.625 9Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274_mobile">
                  <rect width="25" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
        
        
        <div className="btn-icon-desktop">
          {isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281_pc)">
                <path d="M34 12L13 -0.124146C13 -0.124146 18.2487 4.32642 18.2487 12C18.2487 19.6735 13 24.1241 13 24.1241L34 12Z" fill="white"/>
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
                <path d="M21 12L0 -0.124146C0 -0.124146 5.24874 4.32642 5.24874 12C5.24874 19.6735 0 24.1241 0 24.1241L21 12Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274_pc">
                  <rect width="34" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </button>
    );
  }


  return (
    <Link href={href}>
      <button 
        className={`btn-primary btn-primary-rose ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="btn-text">
          {text}
        </div>
        
        
        <div className="btn-icon-mobile">
          {isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281_mobile)">
                <path d="M25 9L9.375 -0.0931225C9.375 -0.0931225 13.7491 3.24482 13.7491 9C13.7491 14.7552 9.375 18.0931 9.375 18.0931L25 9Z" fill="white"/>
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
                <path d="M15.625 9L0 -0.0931225C0 -0.0931225 4.37406 3.24482 4.37406 9C4.37406 14.7552 0 18.0931 0 18.0931L15.625 9Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274_mobile">
                  <rect width="25" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
        
        
        <div className="btn-icon-desktop">
          {isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281_pc)">
                <path d="M34 12L13 -0.124146C13 -0.124146 18.2487 4.32642 18.2487 12C18.2487 19.6735 13 24.1241 13 24.1241L34 12Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1281_pc">
                  <rect width="34" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1274_pc">
                <path d="M21 12L0 -0.124146C0 -0.124146 5.24874 4.32642 5.24874 12C5.24874 19.6735 0 24.1241 0 24.1241L21 12Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274_pc">
                  <rect width="34" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </button>
    </Link>
  );
};

export default Button1PC;
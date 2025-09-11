'use client';
import Link from 'next/link';
import { useState } from 'react';

const ButtonHeader2 = ({ 
  text = "お問い合わせ", 
  href = "/", 
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href}>
      <button 
        className={`btn-header2 btn-header2-black cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="btn-header2-content">
          <div className="btn-header2-text">
            {text}
          </div>
        </div>
        <div className="btn-header2-icon">
          {isHovered ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1281)">
                <path d="M34 12L13 -0.124146C13 -0.124146 18.2487 4.32642 18.2487 12C18.2487 19.6735 13 24.1241 13 24.1241L34 12Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1281">
                  <rect width="34" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="24" viewBox="0 0 34 24" fill="none" className="w-full h-full">
              <g clipPath="url(#clip0_6_1274)">
                <path d="M21 12L0 -0.124146C0 -0.124146 5.24874 4.32642 5.24874 12C5.24874 19.6735 0 24.1241 0 24.1241L21 12Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_6_1274">
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

export default ButtonHeader2;
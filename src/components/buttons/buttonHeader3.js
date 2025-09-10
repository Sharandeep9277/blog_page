'use client';

import Link from 'next/link';
import { useState } from 'react';

const ButtonHeader3 = ({ 
  text = "TOP", 
  href = "/", 
  isSelected = false,
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getClassName = () => {
    let classes = 'btn-header btn-header-dark';
    if (isSelected) classes += ' selected';
    return classes;
  };

  return (
    <Link href={href}>
      <button 
        className={`${getClassName()} ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <b className="btn-header-text2">{text}</b>
      </button>
    </Link>
  );
};

export default ButtonHeader3;


'use client';

import Link from 'next/link';
import { useState } from 'react';

const ButtonHeader1 = ({ 
  text = "TOP", 
  href = "/", 
  isSelected = false,
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getClassName = () => {
    let classes = 'btn-header btn-header-light';
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
        <b className="btn-header-text">{text}</b>
      </button>
    </Link>
  );
};

export default ButtonHeader1;


'use client';
import { useState } from 'react';
import Link from 'next/link';
import WillederLogo from './WillederLogo';
import ButtonHeader1 from './buttons/buttonHeader1';
import ButtonHeader2 from './buttons/buttonHeader2';
import Button1PC from './buttons/button1PC';

const Navbar = ({ 
  className = "",
  menuItems = [
    { text: "TOP", href: "/", isSelected: true },
    { text: "ブログ", href: "/blogs", isSelected: false }
  ],
  contactText = "お問い合わせ",
  contactText2 = "お問い合わせはこちら",
  contactHref = "/contact"
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="w-full">
      <nav className={`navbar ${className}`}>
        
        <div className="navbar-logo-container">
          <div className="navbar-logo">
            <WillederLogo size="small" />
          </div>
        </div>
        
        
        <div className="navbar-right">
          
          <div className="navbar-menu">
            {menuItems.map((item, index) => (
              <ButtonHeader1
                key={index}
                text={item.text}
                href={item.href}
                isSelected={item.isSelected}
              />
            ))}
          </div>
          
          
          <ButtonHeader2
            text={contactText}
            href={contactHref}
          />
        </div>
        
        
        <div 
          className={`navbar-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`navbar-hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="navbar-hamburger-line"></div>
            <div className="navbar-hamburger-line"></div>
            <svg 
              className="navbar-hamburger-svg"
              xmlns="http://www.w3.org/2000/svg" 
              width="26" 
              height="25" 
              viewBox="0 0 26 25" 
              fill="none"
            >
              <rect x="1" y="22.6274" width="32" height="3" transform="rotate(-45 1 22.6274)" fill="black"/>
              <rect x="3" width="32" height="3" transform="rotate(45 3 0)" fill="black"/>
            </svg>
          </div>
        </div>
      </nav>
      
      
      {isMobileMenuOpen && (
        <div className="navbar-mobile-dropdown">
          {menuItems.map((item, index) => (
            <div key={index} className="navbar-mobile-menu-item">
              <Link 
                href={item.href} 
                className="navbar-mobile-menu-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.text}
              </Link>
            </div>
          ))}
          
          {/* Mobile CTA footer */}
          <div className="navbar-mobile-cta">
            <Button1PC
              text={contactText2}
              href={contactHref}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
'use client';

import WillederLogoWhite from './WillederLogoWhite';
import ButtonHeader3 from './buttons/buttonHeader3';

const Footer = ({ className = "" }) => {
  return (
    
    <div className={`footer-pc ${className}`}>
      <div className='footer'>
      {/* Logo */}
      <div className="footer-logo-container">
        <WillederLogoWhite 
          className="willeder-logo-white" 
          size="default" 
        />
      </div>
      
      {/* Navigation Buttons */}
      <div className="footer-nav">
        <ButtonHeader3 
          text="TOP" 
          href="/" 
          isSelected={false}
        />
        <ButtonHeader3 
          text="ブログ" 
          href="/service" 
          isSelected={false}
        />
        <ButtonHeader3 
          text="お問い合わせ" 
          href="/blog" 
          isSelected={false}
        />
      </div>
      
      {/* Company Information */}
      <div className="footer-info">
        <div className="footer-info-content">
          {/* US Company */}
          <div className="footer-company-us">
            <div className="footer-company-name">
              Willeder Inc.（アメリカ法人）
            </div>
            <div className="footer-company-address">
              501 Congress Avenue, Suite 150,
              Austin, Texas, 78701, USA
            </div>
          </div>
          
          <div className='footer-right'>
          {/* Divider */}
          <div className="footer-divider">
            <div className="footer-divider-line"></div>
          </div>
          
          {/* Japanese Company */}
          <div className="footer-company-jp">
            <div className="footer-company-name">
              ウィルダー株式会社（日本法人）
            </div>
            <div className="footer-company-address">
              〒141-0022　東京都品川区東五反田1-4-9-606
            </div>
          </div>
          </div>
        </div>
        
        {/* Email */}
        <div className="footer-email">
          support@willeder.com
        </div>
      </div>
    </div>
    <div className='footer-copyright'>
        Willeder Inc. all rights reserved.
    </div>
    </div>

    
  );
};

export default Footer;
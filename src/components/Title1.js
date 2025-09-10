const Title1 = ({ 
  title = "サービス内容",
  subtitle = "Service",
  variant = "light", // "light" or "dark"
  className = ""
}) => {
  const getColorClasses = () => {
    if (variant === "dark") {
      return {
        titleColor: "title1-text-red",
        subtitleColor: "title1-subtitle-red",
        strokeColor: "var(--color-willeder-red)"
      };
    }
    return {
      titleColor: "title1-text-black",
      subtitleColor: "title1-subtitle-black", 
      strokeColor: "black"
    };
  };

  const colors = getColorClasses();

  return (
    <div className={`title1-container ${className}`}>
      {/* Main title */}
      <div className={`title1-text ${colors.titleColor}`}>
        {title}
      </div>
      
      {/* Decorative line with subtitle */}
      <div className="title1-line-container">
        {/* Left line */}
        <div className="title1-line-section">
          {/* Desktop SVG */}
          <svg 
            className="title1-svg-desktop"
            xmlns="http://www.w3.org/2000/svg" 
            width="592" 
            height="2" 
            viewBox="0 0 592 2" 
            fill="none"
          >
            <path d="M0 1H592" stroke={colors.strokeColor}/>
          </svg>
          
          {/* Tablet SVG */}
          <svg 
            className="title1-svg-tablet"
            xmlns="http://www.w3.org/2000/svg" 
            width="312" 
            height="2" 
            viewBox="0 0 312 2" 
            fill="none"
          >
            <path d="M0 0.630127H312" stroke={colors.strokeColor}/>
          </svg>
          
          {/* Mobile SVG */}
          <svg 
            className="title1-svg-mobile"
            xmlns="http://www.w3.org/2000/svg" 
            width="123.5" 
            height="2" 
            viewBox="0 0 123.5 2" 
            fill="none"
          >
            <path d="M0 1H123.5" stroke={colors.strokeColor}/>
          </svg>
        </div>
        
        {/* Center text */}
        <div className="title1-center">
          <div className={`title1-subtitle ${colors.subtitleColor}`}>
            {subtitle}
          </div>
        </div>
        
        {/* Right line */}
        <div className="title1-line-section">
          {/* Desktop SVG */}
          <svg 
            className="title1-svg-desktop"
            xmlns="http://www.w3.org/2000/svg" 
            width="592" 
            height="2" 
            viewBox="0 0 592 2" 
            fill="none"
          >
            <path d="M0 1H592" stroke={colors.strokeColor}/>
          </svg>
          
          {/* Tablet SVG */}
          <svg 
            className="title1-svg-tablet"
            xmlns="http://www.w3.org/2000/svg" 
            width="312" 
            height="2" 
            viewBox="0 0 312 2" 
            fill="none"
          >
            <path d="M0 0.630127H312" stroke={colors.strokeColor}/>
          </svg>
          
          {/* Mobile SVG */}
          <svg 
            className="title1-svg-mobile"
            xmlns="http://www.w3.org/2000/svg" 
            width="123.5" 
            height="2" 
            viewBox="0 0 123.5 2" 
            fill="none"
          >
            <path d="M0.5 1H123.5" stroke={colors.strokeColor}/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Title1;
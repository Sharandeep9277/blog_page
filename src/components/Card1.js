import Image from "next/image";

const Card1 = ({ iconSrc, title, subtitle, description }) => {
      return (
            <div className="card1">
                  <Image 
                        className="card1-icon" 
                        width={280} 
                        height={280} 
                        sizes="100vw" 
                        alt="" 
                        src={iconSrc} 
                        priority
                  />
                  <div className="card1-content">
                        <div className="card1-header">
                              <b className="card1-title">{title}</b>
                              <b className="card1-subtitle">{subtitle}</b>
                        </div>
                        <div className="card1-divider" />
                        <div className="card1-description">
                              {description}
                        </div>
                  </div>
            </div>
      );
};

export default Card1;
import Button1PC from "./buttons/button1PC";

const FooterCta = ({ 
  text = "どんな内容でも、お気軽にご相談ください。",
  mobileText = "どんな内容でも、\nお気軽にご相談ください。",
  buttonText = "お問い合わせはこちら",
  buttonHref = "/contact"
}) => {
  return (
    <div className="footer-cta">
      <div className="footer-cta-text">
        <span className="footer-cta-text-desktop">
          {text}
        </span>
        <span className="footer-cta-text-mobile">
          {mobileText.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < mobileText.split('\n').length - 1 && <br />}
            </span>
          ))}
        </span>
      </div>
      <div className="footer-cta-button">
        <Button1PC 
          text={buttonText}
          href={buttonHref}
        />
      </div>
    </div>
  );
};

export default FooterCta;

const Logo = ({ className = '' }) => {
  return (
    <div className={`logo-wrapper-cosmic ${className}`}>
      {/* Brand Text Logo - Controlled via App.css for responsiveness */}
      <h1 className="logo-font">
        NEBUL<span className="pink-char">Λ</span>
      </h1>
      <p className="logo-tagline">
        FLOWERS • BERRIES • CHOCOLATE
      </p>
    </div>
  );
};

export default Logo;

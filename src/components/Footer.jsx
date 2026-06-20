
const Footer = ({ t }) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = t.copyright.replace('{year}', currentYear);

  return (
    <footer id="contacts" className="site-footer">
      <div className="container footer-container">
        
        {/* Left: Map Address & Button */}
        <div className="footer-left">
          <div className="map-badge">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{t.mapTitle}</span>
          </div>
          <span className="footer-city">{t.address}</span>
          <a href="https://maps.app.goo.gl/uPjinvvrZ1zaRi4g7?g_st=ic" target="_blank" rel="noopener noreferrer" className="btn-outlined btn-maps">
            {t.btnMaps}
          </a>
        </div>

        {/* Center: SEO Search Tags & Links */}
        <div className="footer-center">
          <span className="search-phrase">{t.search}</span>
          <div className="search-services">
            <a href="https://maps.app.goo.gl/uPjinvvrZ1zaRi4g7?g_st=ic" target="_blank" rel="noopener noreferrer">Google Maps</a>
            <span className="dot">•</span>
            <a href="https://www.instagram.com/nebula_flowers_phuket?igsh=ZmdzMXQybzNoYXl2" target="_blank" rel="noopener noreferrer">Instagram</a>
            <span className="dot">•</span>
            <a href="https://www.tiktok.com/@nebula.phuket?_r=1&_t=ZS-96viKhPKoNh" target="_blank" rel="noopener noreferrer">TikTok</a>
          </div>
        </div>

        {/* Right: Copyright */}
        <div className="footer-right">
          <p className="copyright">
            {copyrightText}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

import heroImg from '../assets/nebula_hero.png';

const Hero = ({ onOrderClick, t }) => {
  return (
    <section id="main" className="hero-section">
      <div className="container hero-container">
        
        {/* Left: Text Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-star">✦</span>
            <span>{t.badge}</span>
          </div>
          
          <h1 className="hero-title">
            {t.titleLine1} <br />
            <span className="text-glow">{t.titleLine2}</span>
          </h1>
          
          <p className="hero-description">
            {t.desc}
          </p>
          
          <div className="hero-actions">
            <button className="btn-filled" onClick={onOrderClick}>
              {t.btnOrder} <span className="action-star">✦</span>
            </button>
            <a href="#catalog" className="btn-outlined">
              {t.btnCatalog}
            </a>
          </div>
        </div>
        
        {/* Right: Hero Image & Stacked Cards */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img src={heroImg} className="hero-image" alt="Nebula cosmic bouquet" />
            <div className="hero-glow-back"></div>
          </div>
          
          {/* Side Info Cards */}
          <div className="hero-cards">
            {/* Card 1: Delivery info (Phuket) */}
            <div className="hero-card glass-panel">
              <div className="card-icon-circle">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="2">
                  <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5h20s-1-2.25-2.5-3.5" />
                  <path d="M12 2C7.5 2 4.5 5 4.5 9.5c0 3.5 2 6.5 4.5 8l3 4.5 3-4.5c2.5-1.5 4.5-4.5 4.5-8C19.5 5 16.5 2 12 2z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
              </div>
              <div className="card-info">
                <h4>{t.deliveryTitle}</h4>
                <p>{t.deliveryDesc}</p>
              </div>
            </div>
            
            {/* Card 2: Contacts (WhatsApp, Line, Calls) */}
            <div className="hero-card glass-panel" style={{ width: '220px' }}>
              <div className="card-info" style={{ width: '100%' }}>
                <h4>{t.contactTitle}</h4>
                <p style={{ 
                  margin: '4px 0', 
                  fontSize: '0.82rem', 
                  fontWeight: '700', 
                  color: 'var(--primary)',
                  letterSpacing: '0.5px'
                }}>
                  +66 95 668 0015
                </p>
                <p style={{ fontSize: '0.65rem', opacity: 0.8 }}>
                  {t.contactsSubtitle}
                </p>
                
                <div className="card-social-buttons" style={{ marginTop: '8px' }}>
                  {/* WhatsApp */}
                  <a href="https://wa.me/66956680015" className="btn-social-mini" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </a>
                  
                  {/* Line */}
                  <a href="https://line.me/ti/p/3nKjuFzaCP" className="btn-social-mini" target="_blank" rel="noopener noreferrer" title="Line" style={{ fontSize: '0.62rem', fontWeight: '800' }}>
                    LN
                  </a>
                  
                  {/* Call */}
                  <a href="tel:+66956680015" className="btn-social-mini" title="Call">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

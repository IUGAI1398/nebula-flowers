
const Features = ({ t }) => {
  const icons = [
    // 1. Fresh Flowers
    (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path>
        <path d="M12 22a4 4 0 0 0 4-4v-1a4 4 0 0 0-8 0v1a4 4 0 0 0 4 4z"></path>
        <path d="M2 12a4 4 0 0 0 4 4h1a4 4 0 0 0 0-8H6a4 4 0 0 0-4 4z"></path>
        <path d="M22 12a4 4 0 0 0-4-4h-1a4 4 0 0 0 0 8h1a4 4 0 0 0 4-4z"></path>
      </svg>
    ),
    // 2. Chocolate Strawberries
    (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C11.5 2 10 3 10 4.5C10 5.5 11 6.5 12 6.5C13 6.5 14 5.5 14 4.5C14 3 12.5 2 12 2Z"></path>
        <path d="M12 6.5C7 6.5 3.5 10.5 3.5 15.5C3.5 19.5 7.5 22 12 22C16.5 22 20.5 19.5 20.5 15.5C20.5 10.5 17 6.5 12 6.5Z"></path>
        <circle cx="8" cy="11" r="1" fill="currentColor"></circle>
        <circle cx="16" cy="11" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="13" r="1" fill="currentColor"></circle>
        <circle cx="8" cy="16" r="1" fill="currentColor"></circle>
        <circle cx="16" cy="16" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="18" r="1" fill="currentColor"></circle>
      </svg>
    ),
    // 3. Custom Approach
    (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    // 4. Delivery 24/7
    (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    ),
    // 5. Quality Guarantee
    (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 11 2 2 4-4"></path>
      </svg>
    )
  ];

  return (
    <section id="about" className="features-section">
      <div className="container">
        <div className="features-grid">
          {t.map((item, index) => (
            <div key={index} className="feature-card glass-panel">
              <div className="feature-icon">
                {icons[index]}
              </div>
              <div className="feature-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

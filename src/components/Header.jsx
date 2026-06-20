import { useState } from 'react';
import Logo from './Logo';

const Header = ({ lang, onChangeLang, t }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { name: t.home, href: '#main' },
    { name: t.about, href: '#about' },
    { name: t.services, href: '#services' },
    { name: t.catalog, href: '#catalog' },
    { name: t.reviews, href: '#reviews' },
    { name: t.contacts, href: '#contacts' }
  ];

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* New SVG Logo Reproduction */}
        <a href="#main" className="logo-area" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo showText={true} size={64} />
        </a>

        {/* Navigation */}
        <nav className="header-nav">
          <ul>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials & Lang */}
        <div className="header-actions">
          <div className="social-icons">
            {/* Instagram */}
            <a href="https://www.instagram.com/nebula_flowers_phuket?igsh=ZmdzMXQybzNoYXl2" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@nebula.phuket?_r=1&_t=ZS-96viKhPKoNh" target="_blank" rel="noopener noreferrer" title="TikTok">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
              </svg>
            </a>

            {/* Telegram */}
            <a href="https://t.me/nebula_phuket" target="_blank" rel="noopener noreferrer" title="Telegram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/66956680015" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>

          {/* Lang selector */}
          <div className="lang-selector-wrapper">
            <button className="lang-selector" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span>{lang}</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="lang-dropdown">
                <li onClick={() => { onChangeLang('RU'); setDropdownOpen(false); }}>RU</li>
                <li onClick={() => { onChangeLang('EN'); setDropdownOpen(false); }}>EN</li>
                <li onClick={() => { onChangeLang('TH'); setDropdownOpen(false); }}>TH</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

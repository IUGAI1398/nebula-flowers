import { useState } from 'react';
import BackgroundStars from './BackgroundStars';
import Logo from './Logo';

const AdminLogin = ({ onLoginSuccess, onBackToSite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay for a real production login feel
    setTimeout(() => {
      // Get password from env or fallback
      const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'nebula-phuket-2026';
      const expectedUsername = 'admin';

      if (username.toLowerCase() === expectedUsername && password === envPassword) {
        sessionStorage.setItem('nebula_admin_session', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid username or access code');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="admin-login-page">
      <BackgroundStars count={70} />
      
      <div className="login-card-container">
        <div className="login-card glass-panel">
          
          <div className="login-header">
            <Logo showText={false} size={70} />
            <h2 className="login-title">NEBULA</h2>
            <p className="login-subtitle">COSMIC CONTROL PANEL</p>
          </div>

          {error && (
            <div className="login-error-alert">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="login-label">Commander ID</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  disabled={isSubmitting}
                  className="login-input"
                  required
                />
                <span className="input-icon">✦</span>
              </div>
            </div>

            <div className="form-group">
              <label className="login-label">Access Code</label>
              <div className="input-with-icon">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isSubmitting}
                  className="login-input"
                  required
                />
                <span className="input-icon">🔑</span>
              </div>
            </div>

            <button type="submit" className="btn-filled btn-login-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24" width="18" height="18">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="30 30" />
                  </svg>
                  <span>Establishing Connection...</span>
                </>
              ) : (
                <>
                  <span>Initialize Console</span>
                  <span className="submit-star">✦</span>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <button onClick={onBackToSite} className="btn-back-to-site">
              ← Return to Nebula Website
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

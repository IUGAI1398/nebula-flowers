import { useEffect } from 'react';

const Toast = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="toast-container">
      <div className="toast-content glass-panel glow-toast">
        <div className="toast-icon-circle">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="toast-message-body">
          <p>{message}</p>
        </div>
        <button className="toast-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;

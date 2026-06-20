import { useState } from 'react';

const BackgroundStars = ({ count = 60 }) => {
  const [stars] = useState(() => {
    const starArray = [];
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 2 + 1; // 1px to 3px
      const duration = Math.random() * 4 + 3; // 3s to 7s
      const delay = Math.random() * 5;
      
      const isPink = Math.random() < 0.25;
      const color = isPink ? '#ff85bb' : '#fff';
      const glow = isPink 
        ? '0 0 8px #ff85bb, 0 0 12px rgba(255, 133, 187, 0.6)' 
        : '0 0 8px #fff, 0 0 12px var(--primary)';
      
      starArray.push({
        id: i,
        style: {
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: '50%',
          opacity: Math.random() * 0.7 + 0.3,
          boxShadow: glow,
          animation: `star-twinkle ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          pointerEvents: 'none',
        }
      });
    }
    return starArray;
  });

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1
    }}>
      {stars.map((star) => (
        <div key={star.id} style={star.style} />
      ))}
    </div>
  );
};

export default BackgroundStars;

'use client';
import { useState } from 'react';
import './logout-button.css';

export const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClick = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      console.log("Logout action here");
      // In a real app, you might redirect or clear user session
      setIsLoggingOut(false);
    }, 2000); // Animation duration
  };

  return (
    <button 
      className={`logout-button-animated ${isLoggingOut ? 'logging-out' : ''}`} 
      onClick={handleClick}
      disabled={isLoggingOut}
    >
      <span className="text">Log Out</span>
      <span className="icon">
        <svg className="doorway" viewBox="0 0 24 24">
          <path d="M19 19V5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v14" />
        </svg>
        <svg className="door" viewBox="0 0 24 24">
          <path d="M16 10v10H8V10h8m0-2H8c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
        </svg>
        <svg className="person" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </span>
    </button>
  );
};

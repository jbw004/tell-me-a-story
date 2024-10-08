import React from 'react';
import logo from '/tellmeastory_clean_vector_logo.png'; // Adjust the path as needed

const Header = () => {
    return (
      <header style={{
        width: '100%',
        height: '29px',
        backgroundColor: 'rgba(250, 249, 246, 0.95)',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <a 
          href="https://tellmeastory.press" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ height: '100%', display: 'flex', alignItems: 'center' }}
        >
          <img 
            src={logo} 
            alt="Tellmeastory.press" 
            style={{ height: '100%', width: 'auto' }} 
          />
        </a>
      </header>
    );
  };
  
  export default Header;
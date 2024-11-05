import React from 'react';
import { useAuth } from '../AuthContext'; // Add this
import { useNavigate } from 'react-router-dom'; // Add this
import logo from '/tellmeastory_clean_vector_logo.png';

const Header = ({ isOwner }) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      login();
    }
  };

    return (
      <header className="app-header">
        <div className="header-left">
          <a 
            href="https://tellmeastory.press" 
            target="_blank" 
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img 
              src={logo} 
              alt="Tellmeastory.press" 
              className="logo-image"
            />
          </a>
        </div>

        <div className="header-right">
          {user && (
            <button 
              onClick={() => navigate('/dashboard')} 
              className="header-button dashboard-button"
            >
              Dashboard
            </button>
          )}
          <button 
            onClick={handleAuthAction} 
            className={`header-button ${user ? 'logout-button' : 'login-button'}`}
          >
            {user ? 'Logout' : 'Login'}
          </button>
        </div>
      </header>
    );
};

export default Header;
import React, { useState, useEffect } from 'react';

const SaveNotification = ({ message, duration = 2000, position = 'default' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={`save-notification save-notification-${position}`}>
      {message}
    </div>
  );
};

export default SaveNotification;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './firebase'; // This will initialize Firebase


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
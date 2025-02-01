import './styles/main.css';
import { initializeApp } from './js/events.js';

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Optional: Enable Webpack hot module replacement
if (module.hot) {
  module.hot.accept();
}
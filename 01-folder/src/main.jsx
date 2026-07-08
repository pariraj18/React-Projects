import React from 'react'
import ReactDOM from 'react-dom/client'  // '/client' add kiya
import './index.css'
import App from './App.jsx'
// import reportWebVitals from './reportWebVitals'  // iski zarurat nahi, hata de

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// reportWebVitals();  // ye bhi hata de
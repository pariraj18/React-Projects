import './App.css'
import React, { useState } from 'react'
import NavBar from './Component/Navbar';  // 1. Component s nahi hai 2. B capital hai
import News from './Component/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 3. Switch hata diya
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 6;
  const apiKey = import.meta.env.VITE_NEWS_API

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
        <NavBar />  {/* B capital */}
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Routes> {/* Switch ki jagah Routes */}
          <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
          <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
          <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
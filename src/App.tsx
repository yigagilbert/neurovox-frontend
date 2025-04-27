import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CookieTestPage from './pages/CookieTestPage';
import ResultPage from './pages/ResultPage';
import { NavBar } from './components/NavBar';
import './index.css';
import React from 'react';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CookieTestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
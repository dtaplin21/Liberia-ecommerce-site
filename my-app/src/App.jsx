import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ComingSoon from "./pages/ComingSoon"
import Header from './components/Header'
import Home from './pages/Home'
import Fund from './pages/Fund'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Story from './pages/Story'
import Impact from './pages/Impact'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import './App.css'

// Check if coming soon mode is enabled
const isComingSoon = import.meta.env.NEXT_PUBLIC_COMING_SOON === "true"

function App() {
  // Gate: If coming soon is enabled, show ONLY ComingSoon (no router, no header)
  if (isComingSoon) {
    return <ComingSoon />
  }

  // Normal app with router
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fund" element={<Fund />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/story" element={<Story />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div style={{padding: '60px 20px', textAlign: 'center'}}><h2>404 - Page Not Found</h2><p>The page you're looking for doesn't exist.</p></div>} />
      </Routes>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Fund from './pages/Fund'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Story from './pages/Story'
import Contact from './pages/Contact'
import ProgressTracker from './pages/progressTracker'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fund" element={<Fund />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/story" element={<Story />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="*" element={<div style={{padding: '60px 20px', textAlign: 'center'}}><h2>404 - Page Not Found</h2><p>The page you're looking for doesn't exist.</p></div>} />
      </Routes>
    </Router>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Menu, X, AlertTriangle, Radio } from 'lucide-react'
import Home from './pages/Home.jsx'
import Analyze from './pages/Analyze.jsx'
import RiskMap from './pages/RiskMap.jsx'
import Gallery from './pages/Gallery.jsx'
import SafetyGuide from './pages/SafetyGuide.jsx'
import Community from './pages/Community.jsx'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/map', label: 'Risk Map' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/safety', label: 'Safety Guide' },
  { to: '/community', label: 'Community' },
]

function AlertBanner() {
  return (
    <div className="bg-alert/90 py-1.5 px-4 text-center text-xs font-dm font-semibold text-white flex items-center justify-center gap-2">
      <span className="blink-dot w-2 h-2 rounded-full bg-white inline-block" />
      LIVE: Red Alert active in Bihar & Assam — Brahmaputra above danger mark by 2.3m
      <span className="blink-dot w-2 h-2 rounded-full bg-white inline-block" />
    </div>
  )
}

function Navbar({ open, setOpen }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-xl border-b border-cyan/10 shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <AlertBanner />
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Droplets className="w-7 h-7 text-cyan" />
            <div className="absolute inset-0 rounded-full bg-cyan/20 group-hover:bg-cyan/30 transition-colors duration-300 blur-sm" />
          </div>
          <span className="font-bebas text-2xl text-white tracking-wider">Flood<span className="text-cyan">Watch</span></span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-link font-dm text-sm font-medium transition-colors duration-200 pb-1 ${isActive ? 'text-cyan active' : 'text-slate-400 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-1.5 bg-alert/20 border border-alert/40 rounded-full px-3 py-1">
            <Radio className="w-3 h-3 text-alert blink-dot" />
            <span className="text-alert text-xs font-semibold font-dm">LIVE</span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400 hover:text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-navy-800/98 backdrop-blur-xl border-b border-cyan/10 px-4 py-4 flex flex-col gap-3"
          >
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-dm text-sm font-medium py-2 border-b border-white/5 ${isActive ? 'text-cyan' : 'text-slate-400'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function PageTransition({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-navy relative overflow-x-hidden">
      {/* Global grid bg overlay */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none z-0" />
      <Navbar open={menuOpen} setOpen={setMenuOpen} />
      <div className="pt-[72px]">
        <PageTransition>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/map" element={<RiskMap />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/safety" element={<SafetyGuide />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </PageTransition>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

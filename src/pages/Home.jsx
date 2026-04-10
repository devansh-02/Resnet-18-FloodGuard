import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AlertTriangle, TrendingUp, Shield, MapPin, Users, Activity, ArrowRight, Zap, Eye, Navigation } from 'lucide-react'

const stats = [
  { label: 'Affected Districts', value: '847', unit: '', icon: MapPin, color: 'text-alert' },
  { label: 'People at Risk', value: '2.4M', unit: '+', icon: Users, color: 'text-amber' },
  { label: 'Alerts Issued', value: '156', unit: '', icon: AlertTriangle, color: 'text-cyan' },
  { label: 'Predictions Today', value: '1,204', unit: '', icon: Activity, color: 'text-safe' },
]

const tickerItems = [
  '🔴 RED ALERT — Brahmaputra overflows in Dibrugarh',
  '🟡 HIGH RISK — Ganga rising near Patna (danger mark: +1.8m)',
  '🔴 RED ALERT — Flash flood warning for Almora district',
  '🟢 SAFE — Yamuna within limits at Delhi Barrage',
  '🟡 HIGH RISK — Rapti river breaches embankment in Gorakhpur',
  '🔴 RED ALERT — Kosi river threatening 3 districts in Bihar',
  '🟢 SAFE — Sutlej levels stabilizing near Ludhiana',
  '🟡 HIGH RISK — Mandakini rising in Rudraprayag',
]

const features = [
  {
    icon: Eye,
    title: 'AI-Powered Detection',
    desc: 'Upload aerial or satellite imagery for instant flood risk analysis using computer vision.',
    color: 'from-cyan/20 to-cyan/5',
    border: 'border-cyan/30',
  },
  {
    icon: Navigation,
    title: 'Real-Time Risk Maps',
    desc: 'Color-coded flood zone maps across Bihar, Assam, UP, Uttarakhand & Punjab.',
    color: 'from-amber/20 to-amber/5',
    border: 'border-amber/30',
  },
  {
    icon: Shield,
    title: 'Safety Protocols',
    desc: 'Location-specific emergency guides for urban, rural, and riverine areas.',
    color: 'from-safe/20 to-safe/5',
    border: 'border-safe/30',
  },
  {
    icon: Zap,
    title: 'Community Reports',
    desc: 'Ground-truth flood reports from locals, verified and geotagged in real time.',
    color: 'from-alert/20 to-alert/5',
    border: 'border-alert/30',
  },
]

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = num / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= num) { setCount(num); clearInterval(timer) }
      else setCount(current)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  const formatted = target.includes('M') ? `${count.toFixed(1)}M` : target.includes(',') ? Math.floor(count).toLocaleString() : Math.floor(count).toString()

  return <span ref={ref}>{formatted}{suffix}</span>
}

function WaveHero() {
  return (
    <div className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-800 to-[#071020]" />
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-amber/5 rounded-full blur-3xl" />

      {/* Animated wave layers */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
        <div className="wave-bg w1">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'200%',height:'120px'}}>
            <path d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1440,20 1440,60 L1440,120 L0,120 Z" fill="#00d4ff" />
          </svg>
        </div>
        <div className="wave-bg w2">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'200%',height:'120px'}}>
            <path d="M0,40 C200,90 400,10 600,50 C800,90 1000,10 1200,50 C1300,70 1380,40 1440,50 L1440,120 L0,120 Z" fill="#00a8cc" />
          </svg>
        </div>
        <div className="wave-bg w3">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'200%',height:'120px'}}>
            <path d="M0,70 C150,30 300,100 450,70 C600,40 750,100 900,70 C1050,40 1200,90 1440,60 L1440,120 L0,120 Z" fill="#006688" />
          </svg>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-cyan/20"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 70 + '%',
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-alert blink-dot" />
            <span className="text-xs font-dm font-semibold text-alert uppercase tracking-[0.2em]">Live Monitoring Active</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-bebas text-[5.5rem] md:text-[8rem] leading-none text-white mb-2"
          >
            FLOOD
            <span className="block shimmer-text">WATCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-bebas text-3xl md:text-5xl text-slate-400 tracking-widest mb-8"
          >
            Predict. Prepare. Protect.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="font-dm text-slate-400 text-lg max-w-xl mb-10 leading-relaxed"
          >
            AI-powered early warning system for North India's flood-prone regions. Real-time risk assessment, community reporting, and satellite imagery analysis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/analyze" className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-lg font-dm text-sm font-bold">
              <Zap className="w-4 h-4" />
              Analyze Image
            </Link>
            <Link to="/map" className="btn-outline flex items-center gap-2 px-7 py-3.5 rounded-lg font-dm text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              View Risk Map
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-24 right-8 md:right-16 hidden lg:block float-anim opacity-40">
        <div className="w-48 h-48 border border-cyan/30 rounded-full relative">
          <div className="absolute inset-4 border border-cyan/20 rounded-full">
            <div className="absolute inset-4 border border-cyan/10 rounded-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan rounded-full glow-cyan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsTicker() {
  return (
    <div className="bg-navy-800 border-y border-cyan/10 py-3 overflow-hidden relative">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-cyan px-4 py-1 font-bebas text-navy tracking-wider text-sm mr-4 z-10">
          LIVE ALERTS
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'ticker 40s linear infinite' }}>
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="font-dm text-sm text-slate-300 inline-block">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Current Situation</span>
        <h2 className="font-bebas text-5xl md:text-6xl text-white mt-2">NORTH INDIA STATUS</h2>
        <p className="font-dm text-slate-400 mt-2 text-sm">Updated every 15 minutes from IMD & NDRF feeds</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="stat-card rounded-xl p-6 text-center relative overflow-hidden scan-effect"
          >
            <div className={`inline-flex p-3 rounded-lg bg-white/5 mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className={`font-bebas text-4xl md:text-5xl mb-1 ${stat.color}`}>
              <CountUp target={stat.value} suffix={stat.unit} />
            </div>
            <div className="font-dm text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function FeaturesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Platform Capabilities</span>
        <h2 className="font-bebas text-5xl md:text-6xl text-white mt-2">WHAT WE DO</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-6 bg-gradient-to-br ${f.color} border ${f.border} hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="bg-white/10 inline-flex p-3 rounded-lg mb-4">
              <f.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bebas text-xl text-white tracking-wide mb-2">{f.title}</h3>
            <p className="font-dm text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function RecentAlerts() {
  const alerts = [
    { level: 'RED', area: 'Dibrugarh, Assam', desc: 'Brahmaputra 3.2m above danger mark', time: '12 min ago', color: 'border-l-alert bg-alert/5' },
    { level: 'RED', area: 'Darbhanga, Bihar', desc: 'Bagmati river breached left embankment', time: '34 min ago', color: 'border-l-alert bg-alert/5' },
    { level: 'HIGH', area: 'Gorakhpur, UP', desc: 'Rapti riverine flooding in 8 villages', time: '1h ago', color: 'border-l-amber bg-amber/5' },
    { level: 'HIGH', area: 'Almora, Uttarakhand', desc: 'Flash flood warning: Kosi river', time: '2h ago', color: 'border-l-amber bg-amber/5' },
    { level: 'SAFE', area: 'Ludhiana, Punjab', desc: 'Sutlej levels receding from peak', time: '3h ago', color: 'border-l-safe bg-safe/5' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Latest Updates</span>
          <h2 className="font-bebas text-5xl text-white mt-1">RECENT ALERTS</h2>
        </div>
        <Link to="/map" className="btn-outline px-4 py-2 rounded-lg font-dm text-xs font-semibold hidden md:flex items-center gap-1.5">
          Full Map <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-center gap-4 p-4 rounded-lg border-l-4 ${alert.color} border border-r-0 border-t-0 border-b-0`}
          >
            <span className={`text-xs font-bebas tracking-wider px-2 py-0.5 rounded font-bold ${
              alert.level === 'RED' ? 'bg-alert text-white' : alert.level === 'HIGH' ? 'bg-amber text-navy' : 'bg-safe text-white'
            }`}>{alert.level}</span>
            <div className="flex-1">
              <div className="font-dm text-sm font-semibold text-white">{alert.area}</div>
              <div className="font-dm text-xs text-slate-400 mt-0.5">{alert.desc}</div>
            </div>
            <span className="font-dm text-xs text-slate-500 flex-shrink-0">{alert.time}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <WaveHero />
      <StatsTicker />
      <StatsGrid />
      <FeaturesGrid />
      <RecentAlerts />
      {/* Footer spacer */}
      <div className="h-16 border-t border-white/5 flex items-center justify-center">
        <span className="font-dm text-xs text-slate-600">© 2025 FloodWatch — NDRF Data Partner | IMD Verified</span>
      </div>
    </div>
  )
}

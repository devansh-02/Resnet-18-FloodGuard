import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, MapPin, Clock, CheckCircle, AlertTriangle, Plus, X, Send, Camera, Users, Filter, TrendingUp } from 'lucide-react'

const initialReports = [
  {
    id: 1,
    user: 'Rajesh Kumar',
    location: 'Patna, Bihar',
    time: '8 min ago',
    level: 'RED',
    message: 'Ganga river water entered Rajendra Nagar colony. Ground floor residents being evacuated by SDRF boats. 3 houses submerged near Digha ghat.',
    likes: 47,
    replies: 12,
    verified: true,
    coords: '25.6°N, 85.1°E',
  },
  {
    id: 2,
    user: 'Priya Sharma',
    location: 'Dibrugarh, Assam',
    time: '23 min ago',
    level: 'RED',
    message: 'Brahmaputra breach near Naharkatia road. NH-37 flooded, traffic completely halted. Army relief camp set up at Mela Ground — food and medicine available.',
    likes: 89,
    replies: 24,
    verified: true,
    coords: '27.5°N, 94.9°E',
  },
  {
    id: 3,
    user: 'Mohammed Farooq',
    location: 'Gorakhpur, UP',
    time: '45 min ago',
    level: 'HIGH',
    message: 'Rapti river crossing danger mark by 1.2m. Villages in Belghat area getting waterlogged. NDRF team deployed at Kushmi check post. Please avoid Gorakhpur-Maharajganj highway.',
    likes: 34,
    replies: 8,
    verified: true,
    coords: '26.7°N, 83.4°E',
  },
  {
    id: 4,
    user: 'Anita Devi',
    location: 'Rudraprayag, Uttarakhand',
    time: '1h ago',
    level: 'HIGH',
    message: 'Heavy landslide blocked Badrinath highway between Tilwara and Kund. Pilgrims stranded. BRO teams working. Estimated 6-8 hours to clear. Alternative route via Augustmuni.',
    likes: 56,
    replies: 19,
    verified: false,
    coords: '30.3°N, 78.9°E',
  },
  {
    id: 5,
    user: 'Harpreet Singh',
    location: 'Ludhiana, Punjab',
    time: '2h ago',
    level: 'MEDIUM',
    message: 'Sutlej water level receding at Buddha Nullah. Drain 5 area still waterlogged. Municipal pumps operational. Sandbag distribution happening at PAU gate from 9am.',
    likes: 23,
    replies: 6,
    verified: true,
    coords: '30.9°N, 75.8°E',
  },
  {
    id: 6,
    user: 'Sanjay Mishra',
    location: 'Varanasi, UP',
    time: '3h ago',
    level: 'MEDIUM',
    message: 'Ganga water touching lower ghats. Manikarnika and Dashashwamedh ghats partially submerged. Temple priests moved idols to upper platform. Tourist movement restricted.',
    likes: 41,
    replies: 15,
    verified: false,
    coords: '25.3°N, 83.0°E',
  },
  {
    id: 7,
    user: 'NDMA Official',
    location: 'Darbhanga, Bihar',
    time: '4h ago',
    level: 'RED',
    message: '🚨 OFFICIAL: 3 relief camps operational in Darbhanga — Nati Imli School, Bharat Scouts Ground, and Sadar Hospital complex. Total capacity: 4,500 persons. Food, water, medical teams present.',
    likes: 312,
    replies: 67,
    verified: true,
    coords: '26.2°N, 85.9°E',
  },
  {
    id: 8,
    user: 'Meera Nair',
    location: 'Kamrup, Assam',
    time: '5h ago',
    level: 'HIGH',
    message: 'Road to Morigaon completely underwater. Boat service being arranged by district administration. Contact BDO office: 0361-2260123. Please do not attempt to wade through — current is strong.',
    likes: 78,
    replies: 28,
    verified: true,
    coords: '26.4°N, 92.0°E',
  },
]

const levelColors = {
  RED: { bg: 'bg-alert/10', border: 'border-l-alert', badge: 'bg-alert text-white', dot: 'bg-alert' },
  HIGH: { bg: 'bg-amber/10', border: 'border-l-amber', badge: 'bg-amber text-navy', dot: 'bg-amber' },
  MEDIUM: { bg: 'bg-yellow-500/10', border: 'border-l-yellow-500', badge: 'bg-yellow-500 text-navy', dot: 'bg-yellow-500' },
}

function ReportCard({ report, index }) {
  const [liked, setLiked] = useState(false)
  const lc = levelColors[report.level] || levelColors.MEDIUM

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`community-card rounded-xl border-l-4 ${lc.border} ${lc.bg} border border-white/5 p-5`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan/20 to-navy-700 border border-white/10 flex items-center justify-center flex-shrink-0">
            <span className="font-bebas text-sm text-cyan">{report.user.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-dm text-sm font-semibold text-white">{report.user}</span>
              {report.verified && (
                <span className="verified-badge">✓ Verified</span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1 font-dm text-xs text-slate-500">
                <MapPin className="w-2.5 h-2.5" />{report.location}
              </span>
              <span className="flex items-center gap-1 font-dm text-xs text-slate-600">
                <Clock className="w-2.5 h-2.5" />{report.time}
              </span>
            </div>
          </div>
        </div>
        <span className={`text-xs font-bebas tracking-wider px-2 py-0.5 rounded font-bold ${lc.badge}`}>
          {report.level}
        </span>
      </div>

      {/* Message */}
      <p className="font-dm text-sm text-slate-300 leading-relaxed mb-3">{report.message}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 font-dm text-xs text-slate-500">
          <MapPin className="w-3 h-3" />
          <span>{report.coords}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 font-dm text-xs transition-colors ${liked ? 'text-cyan' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {report.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 font-dm text-xs text-slate-500 hover:text-slate-300 transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            {report.replies}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function SubmitModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ location: '', level: 'HIGH', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!form.location || !form.message) return
    setSubmitted(true)
    setTimeout(() => {
      onSubmit(form)
      onClose()
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-navy-800 border border-white/10 rounded-2xl p-6 w-full max-w-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bebas text-2xl text-white tracking-wider">REPORT FLOOD EVENT</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            <div>
              <label className="font-dm text-xs text-slate-400 uppercase tracking-wider mb-2 block">Location *</label>
              <input
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Patna, Bihar"
                className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2.5 font-dm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan/40"
              />
            </div>

            <div>
              <label className="font-dm text-xs text-slate-400 uppercase tracking-wider mb-2 block">Alert Level *</label>
              <div className="flex gap-2">
                {['RED', 'HIGH', 'MEDIUM'].map(level => (
                  <button
                    key={level}
                    onClick={() => setForm({ ...form, level })}
                    className={`flex-1 py-2 rounded-lg font-bebas text-sm tracking-wider border transition-all ${
                      form.level === level
                        ? level === 'RED' ? 'bg-alert border-alert text-white'
                          : level === 'HIGH' ? 'bg-amber border-amber text-navy'
                          : 'bg-yellow-500 border-yellow-500 text-navy'
                        : 'border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-dm text-xs text-slate-400 uppercase tracking-wider mb-2 block">Description *</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Describe the flood situation, road conditions, people affected, relief needs..."
                rows={4}
                className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2.5 font-dm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan/40 resize-none"
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan/5 border border-cyan/20">
              <Camera className="w-4 h-4 text-cyan flex-shrink-0" />
              <span className="font-dm text-xs text-slate-400">Attach photo evidence for faster verification (optional)</span>
              <button className="ml-auto font-dm text-xs text-cyan border border-cyan/40 px-3 py-1 rounded-lg hover:bg-cyan/10 transition-colors">
                Upload
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 btn-outline py-3 rounded-xl font-dm text-sm font-semibold">
                Cancel
              </button>
              <button onClick={handleSubmit} className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 rounded-xl font-dm text-sm font-bold">
                <Send className="w-4 h-4" />
                Submit Report
              </button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-safe/20 border-2 border-safe flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-safe" />
            </div>
            <p className="font-bebas text-2xl text-white tracking-wider">REPORT SUBMITTED</p>
            <p className="font-dm text-sm text-slate-400 mt-2">Your report is being reviewed for verification. Thank you for keeping communities safe.</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Community() {
  const [reports, setReports] = useState(initialReports)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('All')

  const handleSubmit = (form) => {
    const newReport = {
      id: reports.length + 1,
      user: 'You',
      location: form.location,
      time: 'Just now',
      level: form.level,
      message: form.message,
      likes: 0,
      replies: 0,
      verified: false,
      coords: 'Pending geocode',
    }
    setReports([newReport, ...reports])
  }

  const filtered = filter === 'All' ? reports : reports.filter(r => r.level === filter)

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Ground Reports</span>
          <h1 className="font-bebas text-6xl md:text-7xl text-white mt-1">COMMUNITY</h1>
          <p className="font-dm text-slate-400 mt-2">Real-time flood reports from the ground. Verified dispatches from affected communities, local volunteers, and officials.</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'Active Reports', value: '1,247', icon: MessageSquare, color: 'text-cyan' },
            { label: 'Verified', value: '834', icon: CheckCircle, color: 'text-safe' },
            { label: 'Contributors', value: '3,891', icon: Users, color: 'text-amber' },
          ].map(stat => (
            <div key={stat.label} className="stat-card rounded-xl p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <div className={`font-bebas text-2xl ${stat.color}`}>{stat.value}</div>
              <div className="font-dm text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {['All', 'RED', 'HIGH', 'MEDIUM'].map(level => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`font-dm text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                  filter === level
                    ? level === 'RED' ? 'bg-alert text-white border-alert font-bold'
                      : level === 'HIGH' ? 'bg-amber text-navy border-amber font-bold'
                      : level === 'MEDIUM' ? 'bg-yellow-500 text-navy border-yellow-500 font-bold'
                      : 'bg-cyan text-navy border-cyan font-bold'
                    : 'border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-dm text-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            Submit Report
          </button>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map((report, i) => (
              <ReportCard key={report.id} report={report} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 rounded-xl bg-navy-800 border border-white/5 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
          <p className="font-dm text-xs text-slate-400 leading-relaxed">
            Community reports are citizen-generated. Verified reports (✓) have been checked against official NDMA/SDMA data. Always cross-reference with official government advisories before taking action. FloodWatch is not responsible for the accuracy of unverified reports.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <SubmitModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
        )}
      </AnimatePresence>
    </div>
  )
}

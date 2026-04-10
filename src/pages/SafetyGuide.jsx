import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Home, Building, Waves, Mountain, Filter, Download, ChevronRight, AlertTriangle, CheckCircle, Info } from 'lucide-react'

const locationTypes = ['All', 'Urban', 'Rural', 'Riverine', 'Hill']
const riskLevels = ['All', 'Red', 'High', 'Medium']

const tips = [
  {
    id: 1,
    title: 'Emergency Evacuation Route',
    category: 'Urban',
    risk: 'Red',
    icon: AlertTriangle,
    color: 'text-alert',
    priority: 'CRITICAL',
    steps: [
      'Know your 2 nearest evacuation centers (check with local panchayat)',
      'Keep a 72-hour emergency bag: water, dry food, medicines, documents',
      'Never use elevators during floods — use stairwells and roof access',
      'Signal rescue teams using bright cloth on rooftop',
    ],
  },
  {
    id: 2,
    title: 'Safe Water During Floods',
    category: 'Rural',
    risk: 'High',
    icon: Waves,
    color: 'text-cyan',
    priority: 'HIGH',
    steps: [
      'Boil all water for 5 minutes before drinking',
      'Use ORS packets immediately if clean water unavailable',
      'Never drink floodwater — highly contaminated with sewage & pathogens',
      'Stock 20L+ per family per day for minimum 3 days',
    ],
  },
  {
    id: 3,
    title: 'Flash Flood Escape Protocol',
    category: 'Hill',
    risk: 'Red',
    icon: Mountain,
    color: 'text-amber',
    priority: 'CRITICAL',
    steps: [
      'Move to high ground immediately — never wait for official warning',
      'Avoid riverbanks, gorges, stream beds during heavy rain',
      'If caught in flow: grab a tree, not a rock — rocks can trap limbs',
      'NDRF helpline: 1078 | State emergency: 112',
    ],
  },
  {
    id: 4,
    title: 'Riverine Community Alert System',
    category: 'Riverine',
    risk: 'High',
    icon: Waves,
    color: 'text-cyan',
    priority: 'HIGH',
    steps: [
      'Install CWC water level gauge readings app (free, works offline)',
      'Designate a neighborhood flood warden — practice monthly drills',
      'Keep boat/raft accessible if within 1km of riverbank',
      'Set community WhatsApp group linked to Damini/Meghdoot alerts',
    ],
  },
  {
    id: 5,
    title: 'Urban Basement Flooding',
    category: 'Urban',
    risk: 'Medium',
    icon: Building,
    color: 'text-amber',
    priority: 'MEDIUM',
    steps: [
      'Install flood barriers (sandbags or door dams) pre-monsoon',
      'Raise electrical switchboards to 1.5m above ground level',
      'Keep sump pump tested and backup battery charged',
      'Document valuables — photograph and store cloud backups',
    ],
  },
  {
    id: 6,
    title: 'Rural Home Flood-Proofing',
    category: 'Rural',
    risk: 'Medium',
    icon: Home,
    color: 'text-safe',
    priority: 'MEDIUM',
    steps: [
      'Seal wall cracks with hydraulic cement before monsoon',
      'Raise plinth height: minimum 0.6m above ground for new construction',
      'Plant vetiver grass (Khus) along slopes to arrest soil erosion',
      'Store seeds, livestock feed and grain in waterproof containers at height',
    ],
  },
  {
    id: 7,
    title: 'Children & Elderly Safety',
    category: 'Urban',
    risk: 'High',
    icon: Shield,
    color: 'text-safe',
    priority: 'HIGH',
    steps: [
      'Never leave children under 12 unattended near floodwaters',
      'Elderly: wear reflective bands for identification during rescue',
      'Register special needs household with local BDO office',
      'Carry critical medicines in a waterproof zip-lock bag always',
    ],
  },
  {
    id: 8,
    title: 'Post-Flood Disease Prevention',
    category: 'Rural',
    risk: 'Medium',
    icon: CheckCircle,
    color: 'text-safe',
    priority: 'MEDIUM',
    steps: [
      'Spray bleaching powder in stagnant water to prevent mosquito breeding',
      'Boil & filter all water for minimum 2 weeks post-flood',
      'Watch for leptospirosis symptoms: fever, headache, jaundice — visit PHC immediately',
      'Discard all food items that came in contact with floodwater',
    ],
  },
  {
    id: 9,
    title: 'Hill Landslide Warning Signs',
    category: 'Hill',
    risk: 'Red',
    icon: Mountain,
    color: 'text-alert',
    priority: 'CRITICAL',
    steps: [
      'Watch for sudden change in water clarity/color in local stream',
      'Listen for cracking sounds in walls, tilting trees = imminent slide',
      'Cracks in road or ground appearing overnight = evacuate immediately',
      'Contact NDMA GeoHazard monitoring: +91-11-26701728',
    ],
  },
  {
    id: 10,
    title: 'Electricity Safety in Floods',
    category: 'Urban',
    risk: 'High',
    icon: AlertTriangle,
    color: 'text-amber',
    priority: 'HIGH',
    steps: [
      'Turn off main switch immediately when floodwater enters home',
      'Never touch electrical equipment standing in water',
      'If you see sparking wires in floodwater — keep 6m+ distance',
      'Call DISCOM emergency number — do not attempt DIY repairs',
    ],
  },
  {
    id: 11,
    title: 'Riverine Livestock Protection',
    category: 'Riverine',
    risk: 'Medium',
    icon: Home,
    color: 'text-amber',
    priority: 'MEDIUM',
    steps: [
      'Move livestock to elevated platforms (machan) before water rises',
      'Keep FMD vaccination records accessible for insurance claims',
      'Identify community animal shelters at higher elevation pre-monsoon',
      'Contact NABARD for livestock flood insurance (Pradhan Mantri Fasal Bima)',
    ],
  },
  {
    id: 12,
    title: 'Boat & Navigation Safety',
    category: 'Riverine',
    risk: 'Red',
    icon: Waves,
    color: 'text-alert',
    priority: 'CRITICAL',
    steps: [
      'Never overload country boats — max capacity is painted on hull',
      'Lifejackets mandatory for all — especially children',
      'Do not cross rivers at night during active flood conditions',
      'Report distress using 3 whistle blasts or mirror flash signals',
    ],
  },
]

function TipCard({ tip, index }) {
  const [expanded, setExpanded] = useState(false)
  const priorityColor = tip.priority === 'CRITICAL' ? 'bg-alert/20 text-alert border-alert/40' :
    tip.priority === 'HIGH' ? 'bg-amber/20 text-amber border-amber/40' :
    'bg-safe/20 text-safe border-safe/40'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.08 }}
      className="tip-card rounded-xl overflow-hidden"
    >
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${tip.color}`}>
            <tip.icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bebas text-base text-white tracking-wide leading-tight">{tip.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-dm text-xs text-slate-500">{tip.category}</span>
              <span className="text-slate-600">·</span>
              <span className={`text-xs font-dm font-semibold px-2 py-0.5 rounded-full border ${priorityColor}`}>
                {tip.priority}
              </span>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 text-slate-500 flex-shrink-0 mt-1 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5 pt-4">
              <ul className="space-y-2">
                {tip.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-dm font-bold ${tip.color} mt-0.5`}>
                      {i + 1}
                    </span>
                    <span className="font-dm text-sm text-slate-300 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SafetyGuide() {
  const [locFilter, setLocFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return tips.filter(tip => {
      const locMatch = locFilter === 'All' || tip.category === locFilter
      const riskMatch = riskFilter === 'All' || tip.risk === riskFilter
      const searchMatch = !search || tip.title.toLowerCase().includes(search.toLowerCase())
      return locMatch && riskMatch && searchMatch
    })
  }, [locFilter, riskFilter, search])

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Emergency Protocols</span>
          <h1 className="font-bebas text-6xl md:text-7xl text-white mt-1">SAFETY GUIDE</h1>
          <p className="font-dm text-slate-400 mt-2 max-w-xl">Location-specific flood safety protocols. Filter by terrain type and risk level to find relevant guidance.</p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-navy-800 border border-white/5 rounded-2xl p-5 mb-8"
        >
          <div className="flex flex-wrap gap-6 items-end">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <label className="font-dm text-xs text-slate-400 uppercase tracking-wider mb-2 block">Search</label>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tips..."
                className="w-full bg-navy border border-white/10 rounded-lg px-4 py-2.5 font-dm text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan/40 transition-colors"
              />
            </div>

            {/* Location type */}
            <div>
              <label className="font-dm text-xs text-slate-400 uppercase tracking-wider mb-2 block">Location Type</label>
              <div className="flex gap-2 flex-wrap">
                {locationTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setLocFilter(type)}
                    className={`font-dm text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      locFilter === type
                        ? 'bg-cyan text-navy border-cyan font-bold'
                        : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk level */}
            <div>
              <label className="font-dm text-xs text-slate-400 uppercase tracking-wider mb-2 block">Risk Level</label>
              <div className="flex gap-2">
                {riskLevels.map(level => (
                  <button
                    key={level}
                    onClick={() => setRiskFilter(level)}
                    className={`font-dm text-xs px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                      riskFilter === level
                        ? level === 'Red' ? 'bg-alert text-white border-alert font-bold'
                          : level === 'High' ? 'bg-amber text-navy border-amber font-bold'
                          : level === 'Medium' ? 'bg-safe text-white border-safe font-bold'
                          : 'bg-cyan text-navy border-cyan font-bold'
                        : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* PDF Download */}
            <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-lg font-dm text-sm font-bold ml-auto">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <div className="mt-3 font-dm text-xs text-slate-500">
            Showing {filtered.length} of {tips.length} safety protocols
          </div>
        </motion.div>

        {/* Tips Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tip, i) => (
              <TipCard key={tip.id} tip={tip} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Info className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="font-bebas text-2xl text-slate-500 tracking-wider">NO TIPS MATCH YOUR FILTERS</p>
            <p className="font-dm text-sm text-slate-600 mt-1">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Emergency numbers */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-4 gap-4"
        >
          {[
            { num: '112', label: 'National Emergency', color: 'border-alert/40 bg-alert/5' },
            { num: '1078', label: 'NDRF Helpline', color: 'border-amber/40 bg-amber/5' },
            { num: '1800-180-1551', label: 'Flood Control Room', color: 'border-cyan/40 bg-cyan/5' },
            { num: '9999-90-1234', label: 'IMD Weather Alert', color: 'border-safe/40 bg-safe/5' },
          ].map(item => (
            <div key={item.num} className={`rounded-xl p-4 border text-center ${item.color}`}>
              <div className="font-bebas text-2xl text-white">{item.num}</div>
              <div className="font-dm text-xs text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

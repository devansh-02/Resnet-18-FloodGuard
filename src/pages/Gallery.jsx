import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Droplets } from 'lucide-react'

const floodEvents = [
  {
    id: 1,
    title: 'Bihar Floods 2022',
    location: 'Darbhanga, Bihar',
    date: 'Aug 2022',
    casualties: '350+',
    displaced: '2.1M',
    beforeColor: 'from-green-900 via-emerald-800 to-green-700',
    afterColor: 'from-blue-900 via-blue-800 to-slate-700',
    beforeLabel: 'Pre-flood: Fertile farmlands',
    afterLabel: 'Post-flood: Submerged villages',
    beforeAccent: '#22c55e',
    afterAccent: '#00d4ff',
  },
  {
    id: 2,
    title: 'Assam Deluge 2023',
    location: 'Kamrup, Assam',
    date: 'Jun 2023',
    casualties: '200+',
    displaced: '3.4M',
    beforeColor: 'from-teal-900 via-green-800 to-emerald-700',
    afterColor: 'from-indigo-900 via-blue-800 to-cyan-900',
    beforeLabel: 'Before: Dense vegetation',
    afterLabel: 'After: Total inundation',
    beforeAccent: '#2dd4bf',
    afterAccent: '#6366f1',
  },
  {
    id: 3,
    title: 'Uttarakhand Flash Flood',
    location: 'Chamoli, Uttarakhand',
    date: 'Feb 2021',
    casualties: '200+',
    displaced: '50K',
    beforeColor: 'from-stone-700 via-slate-800 to-gray-700',
    afterColor: 'from-slate-900 via-stone-800 to-gray-900',
    beforeLabel: 'Before: Glacial valley',
    afterLabel: 'After: Debris flow destruction',
    beforeAccent: '#d4d4aa',
    afterAccent: '#78716c',
  },
  {
    id: 4,
    title: 'UP Floods 2021',
    location: 'Gorakhpur, Uttar Pradesh',
    date: 'Sep 2021',
    casualties: '180+',
    displaced: '1.2M',
    beforeColor: 'from-yellow-900 via-amber-800 to-yellow-700',
    afterColor: 'from-blue-950 via-slate-800 to-blue-800',
    beforeLabel: 'Before: Agricultural land',
    afterLabel: 'After: Flooded plains',
    beforeAccent: '#f59e0b',
    afterAccent: '#3b82f6',
  },
  {
    id: 5,
    title: 'Punjab Floods 2023',
    location: 'Amritsar, Punjab',
    date: 'Jul 2023',
    casualties: '50+',
    displaced: '300K',
    beforeColor: 'from-lime-900 via-green-800 to-emerald-900',
    afterColor: 'from-teal-950 via-blue-900 to-slate-800',
    beforeLabel: 'Before: Wheat fields',
    afterLabel: 'After: Sutlej overflow',
    beforeAccent: '#84cc16',
    afterAccent: '#0891b2',
  },
  {
    id: 6,
    title: 'Kedarnath 2013',
    location: 'Rudraprayag, Uttarakhand',
    date: 'Jun 2013',
    casualties: '5,700+',
    displaced: '100K+',
    beforeColor: 'from-gray-700 via-stone-600 to-slate-700',
    afterColor: 'from-gray-950 via-stone-900 to-zinc-800',
    beforeLabel: 'Before: Pilgrimage town',
    afterLabel: 'After: Catastrophic flood',
    beforeAccent: '#9ca3af',
    afterAccent: '#44403c',
  },
  {
    id: 7,
    title: 'Brahmaputra 2020',
    location: 'Majuli Island, Assam',
    date: 'Aug 2020',
    casualties: '120+',
    displaced: '1.8M',
    beforeColor: 'from-emerald-800 via-green-700 to-teal-800',
    afterColor: 'from-blue-900 via-cyan-900 to-slate-800',
    beforeLabel: 'Before: World\'s largest river island',
    afterLabel: 'After: 70% submerged',
    beforeAccent: '#10b981',
    afterAccent: '#06b6d4',
  },
  {
    id: 8,
    title: 'Kosi River 2008',
    location: 'Supaul, Bihar',
    date: 'Aug 2008',
    casualties: '500+',
    displaced: '3M',
    beforeColor: 'from-amber-900 via-yellow-800 to-lime-900',
    afterColor: 'from-blue-950 via-indigo-900 to-blue-800',
    beforeLabel: 'Before: Floodplain settlements',
    afterLabel: 'After: The "Sorrow of Bihar"',
    beforeAccent: '#d97706',
    afterAccent: '#4f46e5',
  },
]

function BeforeAfterSlider({ event }) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef(null)
  const isDragging = useRef(false)

  const updateSlider = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pos)
  }, [])

  const onMouseDown = (e) => { isDragging.current = true; e.preventDefault() }
  const onMouseMove = useCallback((e) => { if (isDragging.current) updateSlider(e.clientX) }, [updateSlider])
  const onMouseUp = () => { isDragging.current = false }
  const onTouchMove = useCallback((e) => { updateSlider(e.touches[0].clientX) }, [updateSlider])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove])

  return (
    <div
      ref={containerRef}
      className="before-after-slider relative rounded-xl overflow-hidden"
      style={{ height: '200px' }}
      onTouchMove={onTouchMove}
    >
      {/* After (right) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${event.afterColor} flex items-end p-3`}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: event.afterAccent }} />
          <span className="font-dm text-xs text-white/70">{event.afterLabel}</span>
        </div>
        {/* Fake flood ripples */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/20"
              style={{
                width: 60 + i * 40 + 'px',
                height: 60 + i * 40 + 'px',
                left: 30 + i * 10 + '%',
                top: 30 + i * 5 + '%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Before (clipped to slider) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${event.beforeColor} flex items-end p-3`}
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: event.beforeAccent }} />
          <span className="font-dm text-xs text-white/70">{event.beforeLabel}</span>
        </div>
        {/* Fake terrain lines */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 h-px bg-white"
              style={{ top: 15 + i * 15 + '%', opacity: 0.3 + i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-navy/70 backdrop-blur-sm rounded px-2 py-0.5 pointer-events-none z-10">
        <span className="font-dm text-xs text-safe font-semibold">BEFORE</span>
      </div>
      <div className="absolute top-3 right-3 bg-navy/70 backdrop-blur-sm rounded px-2 py-0.5 pointer-events-none z-10">
        <span className="font-dm text-xs text-cyan font-semibold">AFTER</span>
      </div>

      {/* Slider handle */}
      <div
        className="slider-handle"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        onMouseDown={onMouseDown}
        onTouchStart={() => {}}
      />
    </div>
  )
}

export default function Gallery() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Historical Record</span>
          <h1 className="font-bebas text-6xl md:text-7xl text-white mt-1">FLOOD GALLERY</h1>
          <p className="font-dm text-slate-400 mt-2 max-w-xl">Drag the slider on each card to compare before and after satellite imagery of North India's most devastating flood events.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {floodEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="rounded-2xl overflow-hidden bg-navy-800 border border-white/5 hover:border-cyan/20 transition-all duration-300 group"
            >
              <BeforeAfterSlider event={event} />

              <div className="p-4">
                <h3 className="font-bebas text-lg text-white tracking-wide group-hover:text-cyan transition-colors duration-200">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 mb-3">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span className="font-dm text-xs text-slate-500">{event.location}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="font-bebas text-base text-amber">{event.date}</div>
                    <div className="font-dm text-[10px] text-slate-600 uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                      <Calendar className="w-2.5 h-2.5" />Date
                    </div>
                  </div>
                  <div className="text-center border-x border-white/5">
                    <div className="font-bebas text-base text-alert">{event.casualties}</div>
                    <div className="font-dm text-[10px] text-slate-600 uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                      <Users className="w-2.5 h-2.5" />Lives
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bebas text-base text-cyan">{event.displaced}</div>
                    <div className="font-dm text-[10px] text-slate-600 uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                      <Droplets className="w-2.5 h-2.5" />Displaced
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-navy-800 border border-white/5 text-center">
          <p className="font-dm text-sm text-slate-500">Imagery data sourced from ISRO Bhuvan, NASA Earthdata & Sentinel-2. Historical flood records from NDMA & IMD archives.</p>
        </div>
      </div>
    </div>
  )
}

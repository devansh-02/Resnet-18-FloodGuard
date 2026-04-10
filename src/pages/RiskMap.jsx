import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, LayersControl } from 'react-leaflet'
import { Layers, AlertTriangle, Eye, EyeOff, Info } from 'lucide-react'

const { BaseLayer, Overlay } = LayersControl

const floodZones = [
  {
    id: 'assam',
    name: 'Assam',
    level: 'RED',
    color: '#ef4444',
    fillOpacity: 0.25,
    description: 'Brahmaputra floodplain — highest risk zone',
    affected: '12 districts',
    population: '4.2M',
    coordinates: [
      [27.5, 89.5], [27.8, 91.0], [27.4, 92.5], [26.8, 94.0],
      [26.2, 94.5], [25.5, 92.0], [25.8, 90.0], [26.5, 89.2],
    ],
  },
  {
    id: 'bihar',
    name: 'Bihar',
    level: 'RED',
    color: '#ef4444',
    fillOpacity: 0.25,
    description: 'North Bihar — Kosi, Gandak, Bagmati river system',
    affected: '18 districts',
    population: '6.8M',
    coordinates: [
      [27.5, 83.5], [27.8, 85.0], [27.5, 87.0], [26.8, 87.5],
      [25.5, 87.2], [25.0, 85.5], [25.2, 83.5], [26.5, 83.2],
    ],
  },
  {
    id: 'up',
    name: 'Uttar Pradesh',
    level: 'HIGH',
    color: '#f59e0b',
    fillOpacity: 0.22,
    description: 'Terai belt and Ganga-Yamuna doab region',
    affected: '22 districts',
    population: '9.1M',
    coordinates: [
      [28.5, 78.0], [28.8, 80.5], [28.5, 82.5], [27.5, 83.5],
      [26.0, 83.0], [25.5, 81.0], [26.0, 79.0], [27.0, 77.8],
    ],
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    level: 'HIGH',
    color: '#f59e0b',
    fillOpacity: 0.22,
    description: 'Himalayan foothills — flash flood risk',
    affected: '6 districts',
    population: '1.2M',
    coordinates: [
      [30.5, 78.0], [31.0, 79.5], [30.8, 80.5], [30.0, 80.8],
      [29.2, 79.5], [29.5, 78.5], [30.0, 77.8],
    ],
  },
  {
    id: 'punjab',
    name: 'Punjab',
    level: 'MEDIUM',
    color: '#eab308',
    fillOpacity: 0.18,
    description: 'Sutlej and Beas river valleys',
    affected: '4 districts',
    population: '0.8M',
    coordinates: [
      [32.0, 74.0], [32.5, 75.5], [31.8, 76.5], [31.0, 76.0],
      [30.5, 74.5], [31.0, 73.5], [31.5, 73.8],
    ],
  },
]

const alerts = [
  { id: 1, lat: 27.4, lng: 94.0, level: 'RED', label: 'Dibrugarh', desc: 'Brahmaputra +3.2m' },
  { id: 2, lat: 26.1, lng: 87.5, level: 'RED', label: 'Darbhanga', desc: 'Bagmati breach' },
  { id: 3, lat: 26.7, lng: 83.4, level: 'HIGH', label: 'Gorakhpur', desc: 'Rapti flooding' },
  { id: 4, lat: 29.6, lng: 79.6, level: 'HIGH', label: 'Almora', desc: 'Flash flood risk' },
  { id: 5, lat: 30.9, lng: 75.8, level: 'MEDIUM', label: 'Ludhiana', desc: 'Sutlej watch' },
  { id: 6, lat: 25.6, lng: 85.1, level: 'RED', label: 'Patna', desc: 'Ganga +1.8m' },
  { id: 7, lat: 26.1, lng: 91.7, level: 'HIGH', label: 'Kamrup', desc: 'Kulsi overflow' },
]

const legendItems = [
  { label: 'RED — Extreme Risk', color: '#ef4444', desc: 'Immediate evacuation' },
  { label: 'HIGH — Severe Risk', color: '#f59e0b', desc: 'Prepare to evacuate' },
  { label: 'MEDIUM — Moderate', color: '#eab308', desc: 'Stay alert' },
  { label: 'LOW — Manageable', color: '#22c55e', desc: 'Monitor closely' },
]

export default function RiskMap() {
  const [activeZones, setActiveZones] = useState(true)
  const [activeAlerts, setActiveAlerts] = useState(true)
  const [selected, setSelected] = useState(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMapReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">Interactive</span>
          <h1 className="font-bebas text-6xl md:text-7xl text-white mt-1">RISK MAP</h1>
          <p className="font-dm text-slate-400 mt-2">North India flood zones — color-coded by current risk level</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-white/10 relative"
              style={{ height: '560px' }}
            >
              {mapReady && (
                <MapContainer
                  center={[27.5, 83.5]}
                  zoom={6}
                  style={{ height: '100%', width: '100%', background: '#0d1528' }}
                  zoomControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />

                  {activeZones && floodZones.map(zone => (
                    <Polygon
                      key={zone.id}
                      positions={zone.coordinates}
                      pathOptions={{
                        color: zone.color,
                        fillColor: zone.color,
                        fillOpacity: zone.fillOpacity,
                        weight: 2,
                        dashArray: zone.level === 'MEDIUM' ? '6,4' : null,
                      }}
                      eventHandlers={{ click: () => setSelected(zone) }}
                    >
                      <Popup>
                        <div style={{ fontFamily: 'DM Sans, sans-serif', minWidth: '160px' }}>
                          <div style={{ color: zone.color, fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>
                            {zone.level} RISK — {zone.name}
                          </div>
                          <div style={{ color: '#94a3b8', fontSize: '12px' }}>{zone.description}</div>
                          <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '11px' }}>
                            <div><span style={{ color: '#64748b' }}>Districts: </span><span style={{ color: '#e2e8f0' }}>{zone.affected}</span></div>
                            <div><span style={{ color: '#64748b' }}>Pop: </span><span style={{ color: '#e2e8f0' }}>{zone.population}</span></div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  ))}

                  {activeAlerts && alerts.map(alert => (
                    <CircleMarker
                      key={alert.id}
                      center={[alert.lat, alert.lng]}
                      radius={alert.level === 'RED' ? 9 : alert.level === 'HIGH' ? 7 : 5}
                      pathOptions={{
                        color: alert.level === 'RED' ? '#ef4444' : alert.level === 'HIGH' ? '#f59e0b' : '#eab308',
                        fillColor: alert.level === 'RED' ? '#ef4444' : alert.level === 'HIGH' ? '#f59e0b' : '#eab308',
                        fillOpacity: 0.85,
                        weight: 2,
                      }}
                    >
                      <Popup>
                        <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '13px' }}>{alert.label}</div>
                          <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{alert.desc}</div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              )}

              {/* Map overlay HUD */}
              <div className="absolute top-3 left-3 z-[1000] bg-navy/90 backdrop-blur-sm border border-cyan/20 rounded-xl p-3 space-y-2">
                <div className="font-bebas text-xs text-cyan tracking-widest">LAYERS</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={activeZones} onChange={e => setActiveZones(e.target.checked)}
                    className="w-3 h-3 accent-cyan" />
                  <span className="font-dm text-xs text-slate-300">Flood Zones</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={activeAlerts} onChange={e => setActiveAlerts(e.target.checked)}
                    className="w-3 h-3 accent-amber" />
                  <span className="font-dm text-xs text-slate-300">Alert Points</span>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Legend */}
            <div className="rounded-xl p-4 bg-navy-800 border border-white/5">
              <h3 className="font-bebas text-base text-white tracking-wider mb-4">RISK LEGEND</h3>
              <div className="space-y-3">
                {legendItems.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ background: item.color }} />
                    <div>
                      <div className="font-dm text-xs font-semibold text-white">{item.label}</div>
                      <div className="font-dm text-xs text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone list */}
            <div className="rounded-xl p-4 bg-navy-800 border border-white/5">
              <h3 className="font-bebas text-base text-white tracking-wider mb-3">ACTIVE ZONES</h3>
              <div className="space-y-2">
                {floodZones.map(zone => (
                  <button
                    key={zone.id}
                    onClick={() => setSelected(selected?.id === zone.id ? null : zone)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                      selected?.id === zone.id ? 'border-cyan/40 bg-cyan/5' : 'border-white/5 bg-white/2 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-dm text-sm font-medium text-white">{zone.name}</span>
                      <span className="text-xs font-bold font-bebas px-2 py-0.5 rounded"
                        style={{
                          background: zone.color + '22',
                          color: zone.color,
                          border: `1px solid ${zone.color}44`
                        }}
                      >
                        {zone.level}
                      </span>
                    </div>
                    <div className="font-dm text-xs text-slate-500 mt-1">{zone.affected} · {zone.population} at risk</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected zone detail */}
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 bg-navy-800 border border-cyan/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-cyan" />
                  <h3 className="font-bebas text-sm text-cyan tracking-wider">ZONE DETAIL</h3>
                </div>
                <h4 className="font-bebas text-xl text-white">{selected.name}</h4>
                <p className="font-dm text-xs text-slate-400 mt-1 leading-relaxed">{selected.description}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="font-bebas text-lg text-white">{selected.affected}</div>
                    <div className="font-dm text-xs text-slate-500">Affected</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="font-bebas text-lg" style={{ color: selected.color }}>{selected.population}</div>
                    <div className="font-dm text-xs text-slate-500">Population</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

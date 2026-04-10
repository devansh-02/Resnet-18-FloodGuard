import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Zap, AlertTriangle, CheckCircle, XCircle, ChevronRight, RefreshCw, Eye, Layers, Droplets, Wind } from 'lucide-react'

const mockResults = [
  {
    level: 'HIGH',
    confidence: 87,
    label: 'HIGH RISK',
    color: 'text-alert',
    bgColor: 'bg-alert/10 border-alert/40',
    icon: XCircle,
    iconColor: 'text-alert',
    features: [
      { name: 'Standing Water Detected', severity: 'critical', value: '68% coverage' },
      { name: 'Waterlogged Vegetation', severity: 'high', value: 'North quadrant' },
      { name: 'Infrastructure Submerged', severity: 'high', value: '3 structures' },
      { name: 'Soil Saturation Index', severity: 'medium', value: '0.82 / 1.0' },
      { name: 'Drainage Overflow', severity: 'critical', value: 'Active breach' },
    ],
    region: 'Bihar Plains',
    recommendation: 'Immediate evacuation recommended. Contact district flood control room.',
  },
  {
    level: 'SAFE',
    confidence: 92,
    label: 'LOW RISK',
    color: 'text-safe',
    bgColor: 'bg-safe/10 border-safe/40',
    icon: CheckCircle,
    iconColor: 'text-safe',
    features: [
      { name: 'Surface Water', severity: 'low', value: '<5% coverage' },
      { name: 'Vegetation Health', severity: 'low', value: 'Normal NDVI' },
      { name: 'Drainage Systems', severity: 'low', value: 'Functioning' },
      { name: 'Soil Saturation Index', severity: 'low', value: '0.21 / 1.0' },
      { name: 'Embankment Integrity', severity: 'low', value: 'Intact' },
    ],
    region: 'Punjab Agricultural Zone',
    recommendation: 'Area is currently safe. Monitor weather forecasts for next 48 hours.',
  },
  {
    level: 'MEDIUM',
    confidence: 74,
    label: 'MODERATE RISK',
    color: 'text-amber',
    bgColor: 'bg-amber/10 border-amber/40',
    icon: AlertTriangle,
    iconColor: 'text-amber',
    features: [
      { name: 'Low-lying Inundation', severity: 'medium', value: '23% area' },
      { name: 'River Proximity Risk', severity: 'high', value: '< 500m buffer' },
      { name: 'Vegetation Stress', severity: 'medium', value: 'Moderate NDVI drop' },
      { name: 'Soil Saturation Index', severity: 'medium', value: '0.56 / 1.0' },
      { name: 'Road Access', severity: 'medium', value: '2 routes affected' },
    ],
    region: 'Uttarakhand Foothills',
    recommendation: 'Prepare emergency kit. Stay alert for official advisories.',
  },
]

function DropZone({ onFileSelect, file }) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) onFileSelect(f)
  }, [onFileSelect])

  const handleChange = (e) => {
    const f = e.target.files[0]
    if (f) onFileSelect(f)
  }

  return (
    <div
      className={`drop-zone rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${dragOver ? 'dragover' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <motion.div
        animate={{ y: dragOver ? -8 : 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-cyan/10 border border-cyan/30 flex items-center justify-center">
            <Upload className="w-8 h-8 text-cyan" />
          </div>
          {dragOver && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 rounded-2xl border-2 border-cyan"
              style={{ animation: 'ripple 1s ease-out infinite' }}
            />
          )}
        </div>
        <div>
          <p className="font-bebas text-2xl text-white tracking-wider">
            {dragOver ? 'DROP IT!' : 'DROP IMAGE HERE'}
          </p>
          <p className="font-dm text-sm text-slate-400 mt-1">or click to browse — supports JPG, PNG, TIFF, GeoTIFF</p>
        </div>
        <div className="flex gap-3 mt-2">
          {['Satellite', 'Aerial', 'Drone', 'Street'].map(tag => (
            <span key={tag} className="text-xs font-dm bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function LoadingState({ progress }) {
  const steps = [
    { label: 'Preprocessing image', threshold: 20, icon: Layers },
    { label: 'Running flood detection model', threshold: 50, icon: Eye },
    { label: 'Analyzing water bodies', threshold: 70, icon: Droplets },
    { label: 'Calculating risk indices', threshold: 90, icon: Wind },
    { label: 'Generating report', threshold: 100, icon: Zap },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-cyan/30 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan/20" />
          <Droplets className="w-8 h-8 text-cyan" />
        </motion.div>
        <p className="font-bebas text-3xl text-white mt-4 tracking-wider">ANALYZING IMAGE</p>
        <p className="font-dm text-slate-400 text-sm mt-1">AI flood detection in progress...</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const done = progress > step.threshold
          const active = progress > (steps[i - 1]?.threshold || 0) && !done
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: done || active ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                done ? 'bg-safe/20 border-safe' : active ? 'bg-cyan/20 border-cyan' : 'bg-white/5 border-white/10'
              }`}>
                {done ? (
                  <CheckCircle className="w-4 h-4 text-safe" />
                ) : active ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <RefreshCw className="w-3.5 h-3.5 text-cyan" />
                  </motion.div>
                ) : (
                  <step.icon className="w-3.5 h-3.5 text-slate-500" />
                )}
              </div>
              <span className={`font-dm text-sm ${done ? 'text-safe' : active ? 'text-cyan' : 'text-slate-500'}`}>
                {step.label}
              </span>
              {active && (
                <div className="flex gap-1 ml-auto">
                  {[0, 1, 2].map(j => (
                    <motion.div key={j} className="w-1 h-1 rounded-full bg-cyan"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="font-dm text-xs text-slate-400">Progress</span>
          <span className="font-dm text-xs text-cyan font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

function RiskCard({ result, onReset }) {
  const severityColors = {
    critical: 'text-alert',
    high: 'text-amber',
    medium: 'text-yellow-400',
    low: 'text-safe',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header risk indicator */}
      <div className={`rounded-2xl p-6 border ${result.bgColor} relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{
          background: result.level === 'HIGH' ? '#ef444420' : result.level === 'SAFE' ? '#22c55e20' : '#f59e0b20'
        }} />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <result.icon className={`w-5 h-5 ${result.iconColor}`} />
              <span className="font-dm text-xs text-slate-400 uppercase tracking-wider">Risk Assessment</span>
            </div>
            <h3 className={`font-bebas text-5xl tracking-wider ${result.color}`}>{result.label}</h3>
            <p className="font-dm text-slate-400 text-sm mt-1 flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5" />
              {result.region}
            </p>
          </div>
          <div className="text-right">
            <div className={`font-bebas text-5xl ${result.color}`}>{result.confidence}%</div>
            <div className="font-dm text-xs text-slate-400">Confidence</div>
          </div>
        </div>

        {/* Confidence meter */}
        <div className="mt-4">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
              style={{
                background: result.level === 'HIGH'
                  ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                  : result.level === 'SAFE'
                    ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                    : 'linear-gradient(90deg, #f59e0b, #d97706)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Detected features */}
      <div className="rounded-2xl p-5 bg-navy-800 border border-white/5">
        <h4 className="font-bebas text-lg text-white tracking-wider mb-4 flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan" />
          DETECTED FEATURES
        </h4>
        <div className="space-y-3">
          {result.features.map((feature, i) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  feature.severity === 'critical' ? 'bg-alert' :
                  feature.severity === 'high' ? 'bg-amber' :
                  feature.severity === 'medium' ? 'bg-yellow-400' : 'bg-safe'
                }`} />
                <span className="font-dm text-sm text-slate-300">{feature.name}</span>
              </div>
              <span className={`font-dm text-xs font-semibold ${severityColors[feature.severity]}`}>
                {feature.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div className="rounded-2xl p-5 bg-navy-800 border border-cyan/10">
        <h4 className="font-bebas text-lg text-white tracking-wider mb-2 flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-cyan" />
          RECOMMENDATION
        </h4>
        <p className="font-dm text-sm text-slate-300 leading-relaxed">{result.recommendation}</p>
      </div>

      <button
        onClick={onReset}
        className="btn-outline w-full flex items-center justify-center gap-2 py-3 rounded-xl font-dm text-sm font-semibold"
      >
        <RefreshCw className="w-4 h-4" />
        Analyze Another Image
      </button>
    </motion.div>
  )
}

function MapPinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function Analyze() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [stage, setStage] = useState('idle') // idle | loading | result
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  const handleFileSelect = (f) => {
    setFile(f)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(f)
    setStage('loading')
    setProgress(0)

    // Simulate AI loading
    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 12 + 3
      if (p >= 100) {
        p = 100
        clearInterval(timer)
        const res = mockResults[Math.floor(Math.random() * mockResults.length)]
        setResult(res)
        setStage('result')
      }
      setProgress(Math.min(p, 100))
    }, 250)
  }

  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setStage('idle')
    setProgress(0)
    setResult(null)
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="font-dm text-xs text-cyan uppercase tracking-[0.2em] font-semibold">AI-Powered</span>
          <h1 className="font-bebas text-6xl md:text-7xl text-white mt-1">IMAGE ANALYSIS</h1>
          <p className="font-dm text-slate-400 mt-2 max-w-lg">Upload satellite or aerial imagery to detect flood risk zones using computer vision and terrain analysis.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Upload / Preview */}
          <div>
            <AnimatePresence mode="wait">
              {!preview ? (
                <motion.div key="drop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DropZone onFileSelect={handleFileSelect} file={file} />

                  <div className="mt-6 p-5 rounded-xl bg-navy-800 border border-white/5">
                    <h4 className="font-bebas text-base text-cyan tracking-wider mb-3">SAMPLE IMAGES</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Bihar Floods', gradient: 'from-blue-900 to-blue-800' },
                        { label: 'Assam Deluge', gradient: 'from-teal-900 to-slate-800' },
                        { label: 'UP Inundation', gradient: 'from-slate-800 to-blue-900' },
                      ].map((sample) => (
                        <button
                          key={sample.label}
                          onClick={() => {
                            // Mock: create a dummy file to trigger analysis
                            const mockFile = new File(['mock'], `${sample.label}.jpg`, { type: 'image/jpeg' })
                            setPreview(`https://picsum.photos/seed/${sample.label.replace(' ', '')}/600/400`)
                            setFile(mockFile)
                            setStage('loading')
                            setProgress(0)
                            let p = 0
                            const timer = setInterval(() => {
                              p += Math.random() * 12 + 3
                              if (p >= 100) {
                                p = 100
                                clearInterval(timer)
                                const res = mockResults[Math.floor(Math.random() * mockResults.length)]
                                setResult(res)
                                setStage('result')
                              }
                              setProgress(Math.min(p, 100))
                            }, 250)
                          }}
                          className={`aspect-square rounded-lg bg-gradient-to-br ${sample.gradient} relative overflow-hidden hover:ring-2 ring-cyan/50 transition-all duration-200 flex items-end p-2`}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <Droplets className="w-8 h-8 text-blue-300" />
                          </div>
                          <span className="relative font-dm text-[9px] font-semibold text-slate-300 text-left leading-tight">{sample.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="rounded-2xl overflow-hidden border border-white/10 relative">
                    <img src={preview} alt="Uploaded" className="w-full h-64 object-cover" />
                    <div className="absolute top-3 left-3 bg-navy/80 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5">
                      <span className="font-dm text-xs text-slate-300">{file?.name || 'sample.jpg'}</span>
                    </div>
                    {stage === 'result' && result && (
                      <div className="absolute top-3 right-3">
                        <span className={`text-xs font-bold font-bebas tracking-wider px-3 py-1 rounded-full ${
                          result.level === 'HIGH' ? 'bg-alert text-white' :
                          result.level === 'SAFE' ? 'bg-safe text-white' : 'bg-amber text-navy'
                        }`}>{result.label}</span>
                      </div>
                    )}
                    {/* Grid overlay */}
                    {stage === 'loading' && (
                      <div className="absolute inset-0 grid-bg opacity-60" style={{
                        backgroundImage: 'linear-gradient(#00d4ff15 1px, transparent 1px), linear-gradient(90deg, #00d4ff15 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}>
                        <div className="absolute inset-0 bg-navy/40" />
                        {/* scanning line */}
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-cyan/60"
                          animate={{ top: ['0%', '100%', '0%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </div>

                  {stage === 'result' && result && (
                    <div className="mt-3 p-3 rounded-xl bg-navy-800 border border-white/5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-safe/20 border border-safe/40 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-safe" />
                      </div>
                      <div>
                        <p className="font-dm text-xs font-semibold text-white">Analysis Complete</p>
                        <p className="font-dm text-xs text-slate-400">Processed in 3.2s · Model v4.1-flood-detect</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: loading / results */}
          <div>
            <AnimatePresence mode="wait">
              {stage === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center p-12 rounded-2xl bg-navy-800/50 border border-white/5"
                >
                  <div className="w-16 h-16 rounded-2xl bg-cyan/5 border border-cyan/20 flex items-center justify-center mb-4">
                    <Zap className="w-7 h-7 text-cyan/50" />
                  </div>
                  <p className="font-bebas text-2xl text-slate-500 tracking-wider">AWAITING IMAGE</p>
                  <p className="font-dm text-sm text-slate-600 mt-2">Upload or select a sample image to begin AI analysis</p>
                </motion.div>
              )}

              {stage === 'loading' && (
                <motion.div key="loading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="p-8 rounded-2xl bg-navy-800 border border-white/5"
                >
                  <LoadingState progress={progress} />
                </motion.div>
              )}

              {stage === 'result' && result && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <RiskCard result={result} onReset={handleReset} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

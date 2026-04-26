import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Animated KPI Card Component
function AnimatedKPICard({
  label,
  baseValue,
  icon,
  iconBg,
  glowColor,
  secondary,
  className = ""
}: {
  label: string;
  baseValue: string | number;
  icon: React.ReactNode;
  iconBg: string;
  glowColor: string;
  secondary?: string;
  className?: string;
}) {
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    if (typeof baseValue === 'number') {
      const interval = setInterval(() => {
        const variation = Math.floor(Math.random() * 5) - 2;
        setValue(baseValue + variation);
      }, 2000 + Math.random() * 1000);
      return () => clearInterval(interval);
    }
  }, [baseValue]);

  return (
    <motion.div
      className={`bg-[#1d293d] rounded-xl border border-[#314158] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-[#90a1b9] text-base font-normal">{label}</p>
          <motion.p
            key={String(value)}
            className="text-[#f1f5f9] text-4xl font-semibold"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.p>
          {secondary && (
            <p className="text-[#62748e] text-xs flex items-center gap-2">
              {secondary}
            </p>
          )}
        </div>
        <motion.div
          className={`${iconBg} rounded-lg p-3 min-w-[56px] min-h-[56px] flex items-center justify-center`}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              `0 0 0 0 ${glowColor}00`,
              `0 0 20px 2px ${glowColor}4D`,
              `0 0 0 0 ${glowColor}00`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}

// Drone Marker Component with Pulse
function DroneMarker({
  id,
  position,
  delay = 0
}: {
  id: string;
  position: { x: number; y: number };
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-[#2b7fff] rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{
            duration: 2,
            delay: delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
          style={{ width: '48px', height: '48px', marginLeft: '-2px', marginTop: '-2px' }}
        />
        <div className="relative w-11 h-11 rounded-full bg-[#2b7fff] border-[3px] border-[#8ec5ff] flex items-center justify-center">
          <p className="text-white text-sm font-bold">{id}</p>
        </div>
      </div>
    </motion.div>
  );
}

// Alert Marker
function AlertMarker({
  position,
  type = 'critical'
}: {
  position: { x: number; y: number };
  type?: 'critical' | 'medium';
}) {
  const bg = type === 'critical' ? 'bg-[#fb2c36]' : 'bg-[#fe9a00]';
  const border = type === 'critical' ? 'border-[#ffa2a2]' : 'border-[#ffd230]';

  return (
    <motion.div
      className="absolute"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className={`w-4 h-4 rounded-full ${bg} border-2 ${border} opacity-60`} />
    </motion.div>
  );
}

// Live Badge with Pulse
function LiveBadge() {
  return (
    <div className="bg-[rgba(70,8,9,0.3)] border border-[#9f0712] rounded-md px-3 py-1 flex items-center gap-2">
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-[#ff6467]"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <p className="text-[#ff6467] text-xs font-medium">LIVE</p>
    </div>
  );
}

// Scanning Line Animation
function ScanningLine() {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#155dfc] to-transparent"
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ boxShadow: '0 0 10px 2px rgba(21, 93, 252, 0.5)' }}
      />
    </motion.div>
  );
}

// Detection Box with Pulse
function DetectionBox() {
  const [confidence, setConfidence] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(87 + Math.floor(Math.random() * 5) - 2);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-[17%] top-[38%] w-[40%]">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Detection Label */}
        <motion.div
          className="bg-[#fb2c36] rounded-t px-4 py-2"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(251, 44, 54, 0)',
              '0 0 15px 2px rgba(251, 44, 54, 0.4)',
              '0 0 0 0 rgba(251, 44, 54, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.p
            key={confidence}
            className="text-white text-xs font-medium"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
          >
            Cracks • {confidence}% confidence
          </motion.p>
        </motion.div>

        {/* Detection Box */}
        <motion.div
          className="border-2 border-[#fb2c36] rounded-b h-28"
          animate={{
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-[#0f172b] min-h-screen w-full p-6">
      {/* Header */}
      <motion.header
        className="bg-[#1e293b] border border-[#334155] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)] rounded-2xl px-6 py-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          {/* Left Group: Logo + Title + Subtitle */}
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">
              <img src="/src/imports/Image_(DXC_OASIS).png" alt="DXC Logo" className="h-[23px] w-auto" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[#f8fafc] text-xl font-bold leading-tight">Drone Inspection AI</h1>
              <p className="text-[#94a3b8] text-sm opacity-70 mt-0.5">Refinery Inspection Platform</p>
            </div>
          </div>

          {/* Right Group: Status + Icons */}
          <div className="flex items-center gap-4">
            {/* System Online Status */}
            <div className="bg-[rgba(3,46,21,0.3)] border border-[#016630] rounded-lg px-3 py-1.5 flex items-center gap-2">
              <motion.div
                className="w-2 h-2 rounded-full bg-[#05df72]"
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <p className="text-[#05df72] text-xs font-medium">System Online</p>
            </div>

            {/* Notification Bell */}
            <button className="relative bg-[#334155] hover:bg-[#475569] rounded-lg p-2.5 transition-colors">
              <svg className="w-5 h-5 text-[#e2e8f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Settings */}
            <button className="bg-[#334155] hover:bg-[#475569] rounded-lg p-2.5 transition-colors">
              <svg className="w-5 h-5 text-[#e2e8f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* User Profile */}
            <button className="bg-[#334155] hover:bg-[#475569] rounded-lg p-2.5 transition-colors">
              <svg className="w-5 h-5 text-[#e2e8f0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-8 mb-10">
        <AnimatedKPICard
          label="Total Assets Inspected"
          baseValue={1247}
          secondary="+12% vs last week"
          iconBg="bg-[rgba(3,23,46,0.3)]"
          glowColor="rgba(59, 130, 246"
          icon={
            <svg className="w-5 h-5 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <AnimatedKPICard
          label="Active Drones"
          baseValue="3/5"
          iconBg="bg-[rgba(3,46,21,0.3)]"
          glowColor="rgba(5, 223, 114"
          icon={
            <svg className="w-5 h-5 text-[#05df72]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          }
        />
        <AnimatedKPICard
          label="Critical Alerts"
          baseValue={2}
          secondary="Requires attention"
          iconBg="bg-[rgba(70,8,9,0.3)]"
          glowColor="rgba(255, 100, 103"
          icon={
            <svg className="w-5 h-5 text-[#ff6467]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
        <AnimatedKPICard
          label="Inspections in Progress"
          baseValue={3}
          iconBg="bg-[rgba(46,23,3,0.3)]"
          glowColor="rgba(251, 146, 60"
          icon={
            <svg className="w-5 h-5 text-[#fb923c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Refinery Map */}
        <motion.div
          className="bg-[#1d293d] border border-[#314158] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-b border-[#314158] px-6 py-5">
            <h3 className="text-[#f1f5f9] text-base font-semibold mb-1">Refinery Map</h3>
            <p className="text-[#90a1b9] text-xs">Live drone positions and alerts</p>
          </div>

          <div className="p-5">
            <div className="relative h-[540px] overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(49,65,88,0.3)]">
              <img
                src="/src/imports/OilRefinery/fd9849e032239f1dcb564a7aed514ecfc656a820.png"
                alt="Refinery overview"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Drone Markers - Spread across the map */}
              <DroneMarker id="D1" position={{ x: 25, y: 52 }} delay={0.3} />
              <DroneMarker id="D2" position={{ x: 52, y: 35 }} delay={0.5} />
              <DroneMarker id="D3" position={{ x: 48, y: 65 }} delay={0.7} />

              {/* Alert Markers */}
              <AlertMarker position={{ x: 35, y: 68 }} type="critical" />
              <AlertMarker position={{ x: 70, y: 58 }} type="medium" />

              {/* Legend */}
              <motion.div
                className="absolute bottom-6 left-6 bg-[rgba(29,41,61,0.95)] border border-[#314158] rounded-lg px-5 py-3.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-6 text-xs font-semibold text-[#cad5e2]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2b7fff] border border-[#8ec5ff]" />
                    <span>Drones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#fb2c36] border border-[#ffa2a2]" />
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#fe9a00] border border-[#ffd230]" />
                    <span>Medium</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Live Inspection Feed */}
        <motion.div
          className="bg-[#1d293d] border border-[#314158] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="border-b border-[#314158] px-6 py-5 flex items-center justify-between">
            <div>
              <h3 className="text-[#f1f5f9] text-base font-semibold mb-1">Live Inspection Feed</h3>
              <p className="text-[#90a1b9] text-xs">Drone 1 • Zone 1</p>
            </div>
            <LiveBadge />
          </div>

          <div className="p-5">
            <div className="relative h-[540px] overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(49,65,88,0.3)]">
              <img
                src="/src/imports/OilRefinery/e0fd970c655d8b388e412b2cc53486586285c247.png"
                alt="Pipe inspection"
                className="w-full h-full object-cover rounded-lg"
              />

              {/* AI Detection Badge */}
              <motion.div
                className="absolute top-6 left-6 bg-[rgba(15,23,43,0.9)] border border-[#314158] rounded px-3 py-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-[#f1f5f9] text-xs font-medium">AI Detection Active</p>
              </motion.div>

              {/* Detection Box */}
              <DetectionBox />

              {/* CTA Button */}
              <motion.button
                className="absolute bottom-6 left-6 right-6 bg-[#155dfc] hover:bg-[#1451d9] rounded-lg px-6 py-3.5 flex items-center justify-center gap-3 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-white text-sm font-medium">View Detailed Report</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

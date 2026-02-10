import { motion } from "framer-motion";
import { useState, useMemo } from "react";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [letterOnTop, setLetterOnTop] = useState(false);

  // Pre-calculate random values for hearts animation
  const heartPositions = useMemo(() => 
    Array.from({ length: 12 }).map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
    })),
    []
  );

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Delay z-index change until flap animation is mostly complete
      setTimeout(() => setLetterOnTop(true), 500);
      setTimeout(onOpen, 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-20 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative cursor-pointer"
        onClick={handleClick}
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15,
          duration: 1 
        }}
        whileHover={!isOpen ? { scale: 1.05, y: -8 } : {}}
      >
        {/* Envelope container */}
        <div className="relative w-[380px] h-[260px] md:w-[480px] md:h-[320px]">
          
          {/* Letter inside - pops up when envelope opens */}
          <motion.div
            className="absolute left-10 right-10 top-8 h-[220px] md:h-[280px] rounded-t shadow-xl"
            style={{
              background: "#FAF8F3",
              border: "1px solid #E8E3D8",
              zIndex: letterOnTop ? 30 : 10,
            }}
            initial={{ y: 0 }}
            animate={isOpen ? { 
              y: -160,
              scale: 1.05
            } : { 
              y: 0,
              scale: 1
            }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8, 
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 150
            }}
          >
            <div className="relative h-full flex flex-col items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-center"
              >
                <div className="font-script text-4xl md:text-5xl mb-3" style={{ color: "#D4405C" }}>
                  For You
                </div>
                <div className="text-3xl mb-2" style={{ color: "#D4405C" }}>♥</div>
                <p className="font-serif text-sm italic" style={{ color: "#8B7355" }}>
                  with all my love
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Envelope back */}
          <div 
            className="absolute inset-0 rounded z-0 shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #D4C5B0 0%, #C9B89A 100%)",
              border: "1px solid #B8A88E",
            }}
          />
          
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top z-20"
            animate={isOpen ? { 
              rotateX: -180, 
              y: 0,
            } : { 
              rotateX: 0, 
              y: 0 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              transformStyle: "preserve-3d",
            }}
          >
            <svg
              viewBox="0 0 480 160"
              className="w-full rounded"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9B89A" />
                  <stop offset="50%" stopColor="#BEA886" />
                  <stop offset="100%" stopColor="#B39A72" />
                </linearGradient>
                <linearGradient id="flapGradBack" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A68F6F" />
                  <stop offset="50%" stopColor="#9B8565" />
                  <stop offset="100%" stopColor="#8F7A5B" />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
              </defs>
              {/* Front of flap */}
              <path
                d="M0 0 L240 140 L480 0 Z"
                fill="url(#flapGrad)"
                stroke="#A68F6F"
                strokeWidth="1"
                filter="url(#shadow)"
              />
              {/* Back of flap (visible when flipped) */}
              <path
                d="M0 0 L240 140 L480 0 Z"
                fill="url(#flapGradBack)"
                stroke="#8F7A5B"
                strokeWidth="1"
                style={{ transform: "rotateX(180deg)" }}
              />
              <path
                d="M20 10 L240 130"
                stroke="#A68F6F"
                strokeWidth="0.5"
                opacity="0.3"
                fill="none"
              />
              <path
                d="M460 10 L240 130"
                stroke="#A68F6F"
                strokeWidth="0.5"
                opacity="0.3"
                fill="none"
              />
            </svg>
            
            {/* Wax seal */}
            <div className="absolute top-[80px] md:top-[100px] left-0 right-0 flex justify-center">
              <motion.div
                animate={isOpen ? { opacity: 0, scale: 0, rotate: 90 } : { opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div 
                  className="relative w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #E85570, #C73B52)",
                    boxShadow: "0 3px 12px rgba(199, 59, 82, 0.4), inset 0 -2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <div 
                    className="absolute inset-2 rounded-full"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                  <span className="text-white text-2xl font-bold relative z-10">♥</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Envelope front bottom */}
          <svg
            viewBox="0 0 480 320"
            className="absolute bottom-0 w-full z-5"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="envGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4C5B0" />
                <stop offset="100%" stopColor="#C9B89A" />
              </linearGradient>
            </defs>
            <path
              d="M0 320 L0 80 L240 200 L480 80 L480 320 Z"
              fill="url(#envGrad)"
              stroke="#B8A88E"
              strokeWidth="1"
            />
            <path
              d="M0 80 L240 200 L480 80"
              fill="none"
              stroke="#A68F6F"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>

          {/* Address line decoration */}
          {!isOpen && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 space-y-1 z-30">
              <div className="w-32 h-px mx-auto" style={{ background: "#8B7355" }} />
            </div>
          )}
        </div>
      </motion.div>

      {/* Hearts burst when opening */}
      {isOpen && (
        <motion.div className="fixed inset-0 pointer-events-none z-50">
          {heartPositions.map((pos, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl"
              style={{
                left: "50%",
                top: "50%",
                color: "#E85570",
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0.7, 0],
                x: pos.x,
                y: pos.y,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            >
              ♥
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Envelope;

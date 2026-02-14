import { motion } from "framer-motion";
import { useState } from "react";

interface PaperPlaneProps {
  onComplete: () => void;
}

const PaperPlane = ({ onComplete }: PaperPlaneProps) => {
  const [isFlying, setIsFlying] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    if (!isFlying) {
      setIsFlying(true);
      setShowCursor(false);
      setTimeout(() => {
        onComplete();
      }, 2500);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-10"
      onMouseMove={handleMouseMove}
    >
      {/* Custom Cursor */}
      {/* {showCursor && (
        <motion.div
          className="fixed pointer-events-none z-50 text-accent font-script text-lg whitespace-nowrap"
          style={{
            left: cursorPosition.x + 20,
            top: cursorPosition.y + 10,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click Me ✨
        </motion.div>
      )} */}

      {/* Sparkle Trail */}
      {isFlying && (
        <motion.div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-accent text-2xl"
              initial={{ 
                left: "50%", 
                top: "50%",
                opacity: 0,
                scale: 0 
              }}
              animate={{ 
                left: `${30 + i * 3}%`,
                top: `${50 - i * 2}%`,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.08,
                ease: "easeOut"
              }}
            >
              {i % 2 === 0 ? "✨" : "♥"}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Paper Plane */}
      <motion.div
        className="cursor-pointer select-none"
        onClick={handleClick}
        initial={{ scale: 1, rotate: 0 }}
        animate={isFlying ? {
          x: ["0vw", "80vw"],
          y: ["0vh", "-40vh"],
          rotate: [0, 25],
          scale: [1, 0.8, 0],
        } : {
          y: [0, -15, 0],
          rotate: [-2, 2, -2],
        }}
        transition={isFlying ? {
          duration: 2.5,
          ease: "easeInOut",
        } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={!isFlying ? { scale: 1.1, rotate: 5 } : {}}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Paper plane body */}
          <motion.path
            d="M10 50 L90 20 L60 80 L50 55 L10 50Z"
            fill="hsl(var(--champagne))"
            stroke="hsl(var(--soft-pink))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {/* Wing fold */}
          <path
            d="M50 55 L90 20 L60 45 L50 55Z"
            fill="hsl(var(--blush))"
            opacity="0.8"
          />
          {/* Wing highlight */}
          <path
            d="M10 50 L50 55 L60 45 L90 20 L10 50Z"
            fill="url(#planeGradient)"
            opacity="0.3"
          />
          {/* Heart on plane */}
          <motion.text
            x="55"
            y="50"
            fontSize="16"
            fill="hsl(var(--romantic-red))"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ♥
          </motion.text>
          <defs>
            <linearGradient id="planeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--soft-pink))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Instructions */}
      {!isFlying && (
        <motion.p
          className="absolute bottom-1/4 text-center text-soft-pink font-serif text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          A special message awaits you...
        </motion.p>
      )}
    </div>
  );
};

export default PaperPlane;

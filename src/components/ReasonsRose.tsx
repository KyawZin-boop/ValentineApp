import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

const ReasonsRose = () => {
  const [revealedPetals, setRevealedPetals] = useState<number[]>([]);
  const [currentReason, setCurrentReason] = useState<string | null>(null);

  const reasons = [
    "Your beautiful smile",
    "Your kind heart",
    "The way you laugh",
    "Your endless patience",
    "Your warm hugs",
    "Your adventurous spirit",
    "How you believe in me",
    "Your gentle touch",
  ];

  // Pre-calculate random values for consistent animations
  const petalAnimations = useMemo(() => 
    Array.from({ length: 8 }, () => ({
      xMid: (Math.random() - 0.5) * 100,
      xEnd: (Math.random() - 0.5) * 200,
    })), []
  );

  const handlePetalClick = (index: number) => {
    if (!revealedPetals.includes(index)) {
      setRevealedPetals([...revealedPetals, index]);
      setCurrentReason(reasons[index]);
      
      setTimeout(() => {
        setCurrentReason(null);
      }, 3000);
    }
  };

  const petalPositions = [
    { rotate: 0 },
    { rotate: 45 },
    { rotate: 90 },
    { rotate: 135 },
    { rotate: 180 },
    { rotate: 225 },
    { rotate: 270 },
    { rotate: 315 },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Rose container */}
      <div className="relative w-32 h-20">
        {/* Petals */}
        {petalPositions.map((pos, index) => {
          const isRevealed = revealedPetals.includes(index);
          const anim = petalAnimations[index];
          
          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
              }}
            >
              <motion.button
                className="cursor-pointer block"
                style={{ transformOrigin: "center bottom" }}
                onClick={() => handlePetalClick(index)}
                initial={{ y: -20, scale: 1, opacity: 1 }}
                whileHover={!isRevealed ? { scale: 1.2 } : undefined}
                animate={isRevealed ? {
                  y: [-20, -120, 180],
                  x: [0, anim.xMid, anim.xEnd],
                  rotate: [0, 360],
                  opacity: [1, 1, 0],
                } : { y: -20, scale: 1, opacity: 1 }}
                transition={isRevealed ? { duration: 2, ease: "easeOut" } : { duration: 0.2 }}
              >
                <svg
                  width="30"
                  height="40"
                  viewBox="0 0 30 40"
                  fill="none"
                  className={isRevealed ? "pointer-events-none" : ""}
                >
                  <ellipse
                    cx="15"
                    cy="20"
                    rx="12"
                    ry="18"
                    fill={isRevealed ? "hsl(var(--soft-pink))" : "hsl(var(--romantic-red))"}
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                    }}
                  />
                  <ellipse
                    cx="15"
                    cy="20"
                    rx="8"
                    ry="12"
                    fill="hsl(350 70% 50%)"
                    opacity="0.5"
                  />
                </svg>
              </motion.button>
            </div>
          );
        })}

        {/* Rose center */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, hsl(45 80% 60%) 0%, hsl(35 70% 50%) 100%)",
            boxShadow: "0 4px 15px hsl(var(--accent) / 0.5)",
            left: "50px",
            top: "28px",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">✨</span>
        </motion.div>
      </div>

      {/* Stem */}
      <div 
        className="w-1 h-24 rounded-full" 
        style={{ background: "linear-gradient(to bottom, hsl(140 40% 35%), hsl(140 50% 25%))", marginTop: "-25px" }} 
      />

      {/* Label */}
      <p className="mt-4 text-center text-sm text-muted-foreground font-script">
        {revealedPetals.length === 8 
          ? "She loves me! ♥" 
          : "Reasons I Love You"}
      </p>
      <p className="text-xs text-muted-foreground/60">
        ({revealedPetals.length}/8 petals)
      </p>

      {/* Floating reason display */}
      <AnimatePresence>
        {currentReason && (
          <motion.div
            className="fixed inset-x-4 top-1/4 z-50 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
          >
            <div 
              className="px-8 py-4 rounded-full"
              style={{
                background: "linear-gradient(135deg, hsl(var(--romantic-red)) 0%, hsl(var(--soft-pink)) 100%)",
                boxShadow: "0 10px 40px hsl(var(--romantic-red) / 0.5)",
              }}
            >
              <p className="text-white font-script text-xl md:text-2xl text-center">
                {currentReason}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReasonsRose;

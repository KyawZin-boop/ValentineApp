import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MessageBottle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const secretMessage = "You are the most beautiful person, inside and out. Every moment with you is a treasure. I love you more than words can say. ♥";

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Confetti explosion */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  width: 8 + Math.random() * 8,
                  height: 8 + Math.random() * 8,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  background: [
                    "hsl(var(--romantic-red))",
                    "hsl(var(--soft-pink))",
                    "hsl(var(--accent))",
                    "hsl(var(--champagne))",
                  ][Math.floor(Math.random() * 4)],
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500,
                  rotate: Math.random() * 720,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottle */}
      <motion.button
        onClick={handleClick}
        className="relative cursor-pointer"
        animate={!isOpen ? {
          y: [0, -5, 0],
          rotate: [-3, 3, -3],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={!isOpen ? { scale: 1.1 } : {}}
      >
        <svg
          width="60"
          height="100"
          viewBox="0 0 60 100"
          fill="none"
        >
          {/* Bottle body */}
          <path
            d="M20 30 L20 85 Q20 95 30 95 Q40 95 40 85 L40 30 Q40 25 30 25 Q20 25 20 30Z"
            fill="url(#bottleGradient)"
            stroke="hsl(200 40% 60%)"
            strokeWidth="1"
          />
          {/* Bottle neck */}
          <rect x="25" y="10" width="10" height="15" fill="url(#bottleGradient)" />
          {/* Cork */}
          <motion.rect
            x="24"
            y="5"
            width="12"
            height="10"
            rx="2"
            fill="hsl(30 40% 50%)"
            animate={isOpen ? { y: -30, opacity: 0 } : {}}
            transition={{ duration: 0.5 }}
          />
          {/* Message inside */}
          <motion.rect
            x="25"
            y="50"
            width="10"
            height="30"
            rx="2"
            fill="hsl(35 60% 90%)"
            animate={isOpen ? { y: -60, opacity: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          {/* Shine */}
          <ellipse cx="35" cy="60" rx="3" ry="15" fill="white" opacity="0.3" />
          <defs>
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(200 50% 80%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(200 40% 70%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.button>

      <p className="mt-3 text-center text-sm text-muted-foreground font-script">
        Message in a Bottle
      </p>

      {/* Secret message reveal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-4 md:inset-auto md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.div
              className="relative max-w-md w-full p-6 md:p-8 rounded-lg"
              style={{
                background: "linear-gradient(180deg, hsl(35 60% 92%) 0%, hsl(35 50% 85%) 100%)",
                boxShadow: "0 25px 80px hsl(var(--deep-purple) / 0.5)",
              }}
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-3 text-deep-purple/50 hover:text-deep-purple text-2xl"
              >
                ×
              </button>

              {/* Decorative seal */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-romantic-red flex items-center justify-center">
                <span className="text-white text-sm">♥</span>
              </div>

              <div className="pt-4">
                <h4 className="font-script text-2xl text-deep-purple text-center mb-4">
                  A Secret Just for You
                </h4>
                <p className="font-serif text-lg text-deep-purple/90 leading-relaxed text-center italic">
                  "{secretMessage}"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageBottle;

import { motion } from "framer-motion";
import { useState } from "react";
import TypewriterText from "./TypewriterText";
import { Button } from "@/components/ui/button";

interface LovelLetterProps {
  onComplete: () => void;
}

const LoveLetter = ({ onComplete }: LovelLetterProps) => {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [allComplete, setAllComplete] = useState(false);

  const letterContent = [
    { text: "My Dearest Love,", isTitle: true },
    { text: "From the moment our paths crossed, my heart knew it had found its home. Every day with you feels like a beautiful dream I never want to wake from.", isTitle: false },
    // { text: "I remember the first time I saw your smile — time stood still, and in that moment, I knew my life would never be the same. You are the melody to my song, the warmth to my cold days, and the reason my heart beats with such joy.", isTitle: false },
    // { text: "Thank you for being you. For your kindness, your laughter, your patience, and for loving me in ways I never knew possible. You make every ordinary moment feel extraordinary.", isTitle: false },
    // { text: "On this Valentine's Day and every day after, I promise to cherish you, to stand by you, and to love you with all that I am.", isTitle: false },
    { text: "Forever & Always Yours ♥", isTitle: true },
  ];

  const handleParagraphComplete = (index: number) => {
    if (index < letterContent.length - 1) {
      setTimeout(() => {
        setVisibleParagraphs(index + 1);
      }, 500);
    } else {
      // All paragraphs complete, show the continue button
      setTimeout(() => {
        setAllComplete(true);
      }, 500);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-30 p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="relative max-w-3xl w-full my-8"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Letter paper background */}
        <div 
          className="relative rounded-sm p-10 md:p-16 border-2"
          style={{
            background: "linear-gradient(180deg, hsl(45 50% 96%) 0%, hsl(40 45% 94%) 50%, hsl(35 40% 92%) 100%)",
            boxShadow: "0 30px 90px hsl(var(--deep-purple) / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.8)",
            borderColor: "hsl(35 30% 75%)",
          }}
        >
          {/* Decorative corner flourishes */}
          <svg className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 opacity-40" viewBox="0 0 100 100">
            <path d="M0,0 Q20,0 20,20 L20,30 Q20,35 15,35 Q10,35 10,30 L10,20 Q10,10 0,10 Z" fill="hsl(340 60% 55%)" />
            <path d="M0,0 Q0,20 20,20 L30,20 Q35,20 35,15 Q35,10 30,10 L20,10 Q10,10 10,0 Z" fill="hsl(340 60% 55%)" />
            <circle cx="25" cy="25" r="3" fill="hsl(45 96% 60%)" />
          </svg>
          
          <svg className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 opacity-40" viewBox="0 0 100 100">
            <path d="M100,0 Q80,0 80,20 L80,30 Q80,35 85,35 Q90,35 90,30 L90,20 Q90,10 100,10 Z" fill="hsl(340 60% 55%)" />
            <path d="M100,0 Q100,20 80,20 L70,20 Q65,20 65,15 Q65,10 70,10 L80,10 Q90,10 90,0 Z" fill="hsl(340 60% 55%)" />
            <circle cx="75" cy="25" r="3" fill="hsl(45 96% 60%)" />
          </svg>
          
          <svg className="absolute bottom-0 left-0 w-20 h-20 md:w-24 md:h-24 opacity-40" viewBox="0 0 100 100">
            <path d="M0,100 Q20,100 20,80 L20,70 Q20,65 15,65 Q10,65 10,70 L10,80 Q10,90 0,90 Z" fill="hsl(340 60% 55%)" />
            <path d="M0,100 Q0,80 20,80 L30,80 Q35,80 35,85 Q35,90 30,90 L20,90 Q10,90 10,100 Z" fill="hsl(340 60% 55%)" />
            <circle cx="25" cy="75" r="3" fill="hsl(45 96% 60%)" />
          </svg>
          
          <svg className="absolute bottom-0 right-0 w-20 h-20 md:w-24 md:h-24 opacity-40" viewBox="0 0 100 100">
            <path d="M100,100 Q80,100 80,80 L80,70 Q80,65 85,65 Q90,65 90,70 L90,80 Q90,90 100,90 Z" fill="hsl(340 60% 55%)" />
            <path d="M100,100 Q100,80 80,80 L70,80 Q65,80 65,85 Q65,90 70,90 L80,90 Q90,90 90,100 Z" fill="hsl(340 60% 55%)" />
            <circle cx="75" cy="75" r="3" fill="hsl(45 96% 60%)" />
          </svg>

          {/* Decorative top border */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-romantic-red to-transparent"></div>
            <span className="text-romantic-red">♥</span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-romantic-red to-transparent"></div>
          </div>

          {/* Letter content */}
          <div className="relative space-y-8 max-w-2xl mx-auto">
            {letterContent.map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={index <= visibleParagraphs ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={paragraph.isTitle ? "text-center" : "text-justify"}
              >
                {index <= visibleParagraphs && (
                  <TypewriterText
                    text={paragraph.text}
                    delay={index === 0 ? 800 : 200}
                    onComplete={() => handleParagraphComplete(index)}
                    className={
                      paragraph.isTitle
                        ? "font-script text-3xl md:text-5xl text-romantic-red mb-4"
                        : "font-serif text-base md:text-lg text-foreground leading-relaxed indent-8 first-letter:text-3xl first-letter:font-script first-letter:text-romantic-red first-letter:mr-1"
                    }
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Wax seal */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
            <motion.div
              className="flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 2.5, duration: 0.8, type: "spring" }}
            >
              <div className="relative w-16 h-16 rounded-full bg-romantic-red shadow-lg flex items-center justify-center border-4 border-romantic-red/30">
                <span className="text-2xl text-white">♥</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>

          {/* Rose decoration */}
          <motion.div
            className="absolute -bottom-4 -right-4 text-5xl md:text-6xl drop-shadow-lg"
            initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
            animate={{ opacity: 1, rotate: -15, scale: 1 }}
            transition={{ delay: 3, duration: 1, type: "spring" }}
          >
            🌹
          </motion.div>

          {/* Continue button */}
          {allComplete && (
            <div className="absolute -bottom-36 left-0 right-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  onClick={onComplete}
                  className="bg-romantic-red hover:bg-romantic-red/90 text-white px-8 py-6 text-lg font-script shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Continue ♥
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoveLetter;

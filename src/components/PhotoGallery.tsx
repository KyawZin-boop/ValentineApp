import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Placeholder memories - these would be replaced with real photos
  const memories = [
    { id: 1, caption: "Our first date", color: "hsl(340 60% 70%)" },
    { id: 2, caption: "That perfect sunset", color: "hsl(30 70% 70%)" },
    { id: 3, caption: "Adventures together", color: "hsl(200 60% 70%)" },
    { id: 4, caption: "Lazy Sundays", color: "hsl(270 50% 70%)" },
    { id: 5, caption: "Our special place", color: "hsl(150 50% 70%)" },
  ];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  return (
    <>
      {/* Heart trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="group relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--romantic-red)) 0%, hsl(var(--soft-pink)) 100%)",
            boxShadow: "0 10px 40px hsl(var(--romantic-red) / 0.4)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-10 h-10 text-white fill-white" />
        </motion.div>
        <p className="mt-3 text-center text-sm text-muted-foreground font-script">
          Our Memories
        </p>
      </motion.button>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Gallery content */}
            <motion.div
              className="relative z-10 max-w-lg w-full"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 text-foreground/60 hover:text-foreground transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Photo frame */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: memories[currentIndex].color }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center p-8">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-white/50" />
                      <p className="text-white font-script text-2xl">
                        {memories[currentIndex].caption}
                      </p>
                      <p className="text-white/70 text-sm mt-2">
                        Add your photo here
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Romantic frame overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 60px hsl(var(--deep-purple) / 0.3)",
                  }}
                />

                {/* Navigation arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {memories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-accent w-6"
                        : "bg-foreground/30 hover:bg-foreground/50"
                    }`}
                  />
                ))}
              </div>

              {/* Caption */}
              <motion.p
                key={currentIndex}
                className="text-center mt-4 font-script text-xl text-accent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {memories[currentIndex].caption}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;

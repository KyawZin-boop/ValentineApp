import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const PhotoGallery = () => {
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
    <div className="w-full max-w-lg">
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
    </div>
  );
};

export default PhotoGallery;

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, Flower, Mail, X } from "lucide-react";
import PhotoGallery from "./PhotoGallery";
import ReasonsRose from "./ReasonsRose";
import CountdownTimer from "./CountdownTimer";
import MusicPlayer from "./MusicPlayer";
import MessageBottle from "./MessageBottle";

type DialogType = "photos" | "rose" | "message" | null;

const InteractiveElements = () => {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  return (
    <motion.div
      className="min-h-screen py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-center font-script text-4xl md:text-5xl text-accent mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          More Love For You
        </motion.h2>
        <motion.p
          className="text-center text-muted-foreground font-serif mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Explore these special surprises I made just for you ♥
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Interactive elements grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Photo Gallery Card */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              onClick={() => setOpenDialog("photos")}
              className="w-full rounded-2xl p-6 cursor-pointer group bg-white/80 border-2 border-romantic-red/30"
              style={{
                boxShadow: "0 10px 40px hsl(var(--romantic-red) / 0.15)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 50px hsl(var(--romantic-red) / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--romantic-red)) 0%, hsl(var(--soft-pink)) 100%)",
                  }}
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-script text-xl text-romantic-red mb-1">Our Memories</h3>
                  <p className="text-xs text-foreground/60 font-serif">Photo Gallery</p>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Reasons Rose Card */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              onClick={() => setOpenDialog("rose")}
              className="w-full rounded-2xl p-6 cursor-pointer group bg-white/80 border-2 border-romantic-red/30"
              style={{
                boxShadow: "0 10px 40px hsl(var(--romantic-red) / 0.15)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 50px hsl(var(--romantic-red) / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--romantic-red)) 0%, hsl(var(--soft-pink)) 100%)",
                  }}
                >
                  <Flower className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-script text-xl text-romantic-red mb-1">Why I Love You</h3>
                  <p className="text-xs text-foreground/60 font-serif">Reasons Rose</p>
                </div>
              </div>
            </motion.button>
          </motion.div>

          {/* Message Bottle Card */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              onClick={() => setOpenDialog("message")}
              className="w-full rounded-2xl p-6 cursor-pointer group bg-white/80 border-2 border-romantic-red/30"
              style={{
                boxShadow: "0 10px 40px hsl(var(--romantic-red) / 0.15)",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 50px hsl(var(--romantic-red) / 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--romantic-red)) 0%, hsl(var(--soft-pink)) 100%)",
                  }}
                >
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-script text-xl text-romantic-red mb-1">Sweet Messages</h3>
                  <p className="text-xs text-foreground/60 font-serif">Message Bottle</p>
                </div>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Music Player */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <MusicPlayer />
        </motion.div>

        {/* Footer message */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="font-script text-2xl text-soft-pink mb-2">
            Happy Valentine's Day, My Love
          </p>
          <p className="text-muted-foreground font-serif">
            With all my heart, now and forever ♥
          </p>
        </motion.div>
      </div>

      {/* Dialogs */}
      <AnimatePresence>
        {openDialog === "photos" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={() => setOpenDialog(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <button
                onClick={() => setOpenDialog(null)}
                className="absolute -top-12 right-0 text-foreground/60 hover:text-foreground transition-colors z-20"
              >
                <X className="w-8 h-8" />
              </button>
              <PhotoGallery />
            </motion.div>
          </motion.div>
        )}

        {openDialog === "rose" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={() => setOpenDialog(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-md"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <button
                onClick={() => setOpenDialog(null)}
                className="absolute -top-12 right-0 text-foreground/60 hover:text-foreground transition-colors z-20"
              >
                <X className="w-8 h-8" />
              </button>
              <div 
                className="rounded-2xl p-8"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)",
                  boxShadow: "0 20px 60px hsl(var(--deep-purple) / 0.5)",
                }}
              >
                <ReasonsRose />
              </div>
            </motion.div>
          </motion.div>
        )}

        {openDialog === "message" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              onClick={() => setOpenDialog(null)}
            />
            <motion.div
              className="relative z-10 w-full max-w-md"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <button
                onClick={() => setOpenDialog(null)}
                className="absolute -top-12 right-0 text-foreground/60 hover:text-foreground transition-colors z-20"
              >
                <X className="w-8 h-8" />
              </button>
              <MessageBottle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InteractiveElements;

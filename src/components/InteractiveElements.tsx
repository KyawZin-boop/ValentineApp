import { motion } from "framer-motion";
import PhotoGallery from "./PhotoGallery";
import ReasonsRose from "./ReasonsRose";
import CountdownTimer from "./CountdownTimer";
import MusicPlayer from "./MusicPlayer";
import MessageBottle from "./MessageBottle";

const InteractiveElements = () => {
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
          {/* Photo Gallery */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <PhotoGallery />
          </motion.div>

          {/* Reasons Rose */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <ReasonsRose />
          </motion.div>

          {/* Message Bottle */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <MessageBottle />
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
    </motion.div>
  );
};

export default InteractiveElements;

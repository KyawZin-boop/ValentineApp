import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer = () => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);

  const startDate = new Date("2018-08-02");
  
  // Set the break period (in years) - time when you were not together
  // const breakYears = 1;
  
  // Matching the app's background color theme
  const unitColors = [
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Days
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Hours
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Minutes
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Seconds
  ];

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      
      // Calculate total time difference in days, hours, minutes, seconds
      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeUnits([
        { value: days, label: days === 1 ? "Day" : "Days" },
        { value: hours, label: hours === 1 ? "Hour" : "Hours" },
        { value: minutes, label: minutes === 1 ? "Minute" : "Minutes" },
        { value: seconds, label: seconds === 1 ? "Second" : "Seconds" },
      ]);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-romantic-red fill-romantic-red" />
        <h3 className="font-script text-xl text-soft-pink">Time We've Been Together</h3>
        <Heart className="w-5 h-5 text-romantic-red fill-romantic-red" />
      </div>

      {/* Time units - Days, Hours, Minutes, Seconds */}
      <div className="flex justify-center gap-3 flex-wrap">
        {timeUnits.map((unit, index) => {
          const colorScheme = unitColors[index] || unitColors[0];
          return (
            <motion.div
              key={unit.label}
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
            >
              <div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex flex-col items-center justify-center border-2"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.bg} 0%, ${colorScheme.secbg} 100%)`,
                  boxShadow: `0 8px 30px ${colorScheme.bg}40, inset 0 1px 0 rgba(255,255,255,0.3)`,
                  borderColor: `${colorScheme.bg}80`,
                }}
              >
                <motion.span
                  key={unit.value}
                  className="font-display text-3xl md:text-4xl font-bold"
                  style={{ color: colorScheme.text }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {unit.value}
                </motion.span>
                <span className="text-xs font-serif font-semibold" style={{ color: colorScheme.text, opacity: 0.9 }}>
                  {unit.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* {breakYears > 0 && (
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground font-serif">
            <span className="text-rose-gold">♥</span> Including a {breakYears} year break, but our love stayed strong <span className="text-rose-gold">♥</span>
          </p>
        </motion.div>
      )} */}

      <motion.p
        className="mt-4 text-sm text-soft-pink font-serif italic"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ...and counting forever ♥
      </motion.p>
    </motion.div>
  );
};

export default CountdownTimer;

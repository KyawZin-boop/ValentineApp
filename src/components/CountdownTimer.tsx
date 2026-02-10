import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer = () => {
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);
  
  // Set your relationship start date here
  const startDate = new Date("2018-08-02"); // Example: Valentine's Day 2023
  
  // Set the break period (in years) - time when you were not together
  // const breakYears = 1;
  
  // Matching the app's background color theme
  const unitColors = [
    { bg: "hsl(var(--card))", secbg: "hsl(var(--muted))", text: "white" }, // Years - Deep Purple
    { bg: "hsl(var(--card))", secbg: "hsl(var(--muted))", text: "white" }, // Months - Deep Purple
    { bg: "hsl(var(--card))", secbg: "hsl(var(--muted))", text: "white" }, // Days - Deep Purple
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Hours - Romantic Red
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Minutes - Romantic Red
    { bg: "hsl(var(--romantic-red))", secbg: "hsl(var(--soft-pink))", text: "white" }, // Seconds - Romantic Red
  ];

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      
      // Calculate base time difference
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      // Adjust if seconds are negative
      if (seconds < 0) {
        minutes--;
        seconds += 60;
      }

      // Adjust if minutes are negative
      if (minutes < 0) {
        hours--;
        minutes += 60;
      }

      // Adjust if hours are negative
      if (hours < 0) {
        days--;
        hours += 24;
      }

      // Adjust if days are negative
      if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }

      // Adjust if months are negative
      if (months < 0) {
        years--;
        months += 12;
      }

      setTimeUnits([
        { value: years, label: years === 1 ? "Year" : "Years" },
        { value: months, label: months === 1 ? "Month" : "Months" },
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
        <h3 className="font-script text-xl text-accent">Time We've Been Together</h3>
        <Heart className="w-5 h-5 text-romantic-red fill-romantic-red" />
      </div>

      {/* Main time units - Years, Months, Days */}
      <div className="flex justify-center gap-3 mb-4">
        {timeUnits.slice(0, 3).map((unit, index) => {
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

      {/* Digital clock style for hours:minutes:seconds */}
      <motion.div
        className="flex justify-center items-center gap-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {timeUnits.slice(3, 6).map((unit, index) => {
          const actualIndex = index + 3;
          const colorScheme = unitColors[actualIndex] || unitColors[3];
          return (
            <div key={unit.label} className="flex items-center">
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-lg flex flex-col items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.bg} 0%, ${colorScheme.secbg} 100%)`,
                  boxShadow: `0 4px 15px ${colorScheme.bg}30`,
                }}
              >
                <motion.span
                  key={unit.value}
                  className="font-mono text-xl md:text-2xl font-bold"
                  style={{ color: colorScheme.text }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
                <span className="text-[10px] font-serif" style={{ color: colorScheme.text, opacity: 0.8 }}>
                  {unit.label.slice(0, 3)}
                </span>
              </div>
              {index < 2 && (
                <span className="text-romantic-red text-2xl font-bold mx-1 animate-pulse">:</span>
              )}
            </div>
          );
        })}
      </motion.div>

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
        className="mt-4 text-sm text-muted-foreground font-serif italic"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ...and counting forever ♥
      </motion.p>
    </motion.div>
  );
};

export default CountdownTimer;

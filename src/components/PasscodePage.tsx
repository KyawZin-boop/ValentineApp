import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PasscodePageProps {
  onSuccess: () => void;
}

const PasscodePage = ({ onSuccess }: PasscodePageProps) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const correctPasscode = "2818";

  const handleInput = (digit: string) => {
    if (passcode.length < 4) {
      const newPasscode = passcode + digit;
      setPasscode(newPasscode);
      setError(false);

      // Auto-check when 4 digits are entered
      if (newPasscode.length === 4) {
        setTimeout(() => {
          if (newPasscode === correctPasscode) {
            onSuccess();
          } else {
            setError(true);
            setTimeout(() => {
              setPasscode("");
              setError(false);
            }, 800);
          }
        }, 200);
      }
    }
  };

  const handleClear = () => {
    setPasscode("");
    setError(false);
  };

  const handleDelete = () => {
    setPasscode(passcode.slice(0, -1));
    setError(false);
  };

  return (
    <div className="min-h-screen gradient-love flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="text-6xl">💝</span>
          </motion.div>
          <h1 className="font-script text-4xl md:text-5xl text-rose-gold mb-2">
            Enter Passcode
          </h1>
          <p className="text-muted-foreground font-serif">
            Unlock something special
          </p>
        </div>

        {/* Passcode display */}
        <motion.div
          className="flex justify-center gap-3 mb-8"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold transition-all ${
                passcode.length > i
                  ? error
                    ? "bg-destructive/20 border-2 border-destructive"
                    : "bg-rose-gold/20 border-2 border-rose-gold"
                  : "bg-card/50 border-2 border-border"
              }`}
            >
              {passcode.length > i ? "●" : ""}
            </div>
          ))}
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-destructive mb-4 font-serif"
          >
            Incorrect passcode. Try again!
          </motion.p>
        )}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleInput(num.toString())}
              className="h-16 text-xl font-bold bg-card hover:bg-rose-gold/20 border-2 border-border hover:border-rose-gold transition-all"
              disabled={passcode.length === 4}
            >
              {num}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={handleClear}
            className="h-16 bg-card hover:bg-destructive/20 border-2 border-border hover:border-destructive transition-all"
          >
            Clear
          </Button>
          <Button
            onClick={() => handleInput("0")}
            className="h-16 text-xl font-bold bg-card hover:bg-rose-gold/20 border-2 border-border hover:border-rose-gold transition-all"
            disabled={passcode.length === 4}
          >
            0
          </Button>
          <Button
            onClick={handleDelete}
            className="h-16 bg-card hover:bg-muted border-2 border-border hover:border-muted-foreground transition-all"
          >
            ←
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground font-serif italic">
            Hint: A special date... ♥
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PasscodePage;

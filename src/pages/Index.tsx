import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import PaperPlane from "@/components/PaperPlane";
import Envelope from "@/components/Envelope";
import LoveLetter from "@/components/LoveLetter";
import InteractiveElements from "@/components/InteractiveElements";
import PasscodePage from "@/components/PasscodePage";

type Phase = "plane" | "envelope" | "letter" | "interactive";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>("plane");

  const handlePlaneComplete = () => {
    setCurrentPhase("envelope");
  };

  const handleEnvelopeOpen = () => {
    setCurrentPhase("letter");
  };

  const handleLetterComplete = () => {
    setCurrentPhase("interactive");
  };

  const handlePasscodeSuccess = () => {
    setIsUnlocked(true);
  };

  // Show passcode page if not unlocked
  if (!isUnlocked) {
    return <PasscodePage onSuccess={handlePasscodeSuccess} />;
  }

  return (
    <div className="min-h-screen gradient-love overflow-x-hidden">
      {/* Floating hearts background - always visible */}
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {currentPhase === "plane" && (
          <PaperPlane key="plane" onComplete={handlePlaneComplete} />
        )}

        {currentPhase === "envelope" && (
          <Envelope key="envelope" onOpen={handleEnvelopeOpen} />
        )}

        {currentPhase === "letter" && (
          <LoveLetter key="letter" onComplete={handleLetterComplete} />
        )}

        {currentPhase === "interactive" && (
          <InteractiveElements key="interactive" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

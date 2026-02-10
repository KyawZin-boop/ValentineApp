import { motion } from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, SkipBack } from "lucide-react";
import allOfMe from "@/assets/AllOfMe.mp3";
import perfect from "@/assets/Perfect.mp3";
import sayYouWontLetGo from "@/assets/SayYouWontLetGo.mp3";
import thoseEyes from "@/assets/ThoseEyes.mp3";
import blue from "@/assets/Blue.mp3";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [barHeights, setBarHeights] = useState<number[]>([10, 10, 10, 10, 10]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number>();

  const playlist = useMemo(() => [
    { 
      title: "All of Me", 
      artist: "John Legend",
      url: allOfMe
    },
     { 
      title: "Perfect", 
      artist: "Ed Sheeran",
      url: perfect
    },
    { 
      title: "Those Eyes", 
      artist: "New West",
      url: thoseEyes
    },
    { 
      title: "Say You Won't Let Go", 
      artist: "James Arthur",
      url: sayYouWontLetGo
    },
    { 
      title: "Blue", 
      artist: "Yung Kai",
      url: blue
    },
  ], []);

  const nextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      console.log("ref", audioRef.current);
      if (isPlaying) {
        // Resume audio context if suspended
        if (audioContextRef.current?.state === 'suspended') {
          audioContextRef.current.resume();
        }
        audioRef.current.play().catch(err => console.log("Playback failed:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack].url;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Playback failed:", err));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, playlist]);

  // Initialize audio context and analyzer
  useEffect(() => {
    if (!audioRef.current || analyzerRef.current) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioContextClass();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    
    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    analyzerRef.current = analyzer;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Visualizer animation loop
  useEffect(() => {
    if (!isPlaying || !analyzerRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const analyzer = analyzerRef.current;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualizer = () => {
      analyzer.getByteFrequencyData(dataArray);
      
      // Sample 5 different frequency ranges
      const ranges = [
        Math.floor(bufferLength * 0.1),  // Low
        Math.floor(bufferLength * 0.25), // Low-mid
        Math.floor(bufferLength * 0.4),  // Mid
        Math.floor(bufferLength * 0.6),  // Mid-high
        Math.floor(bufferLength * 0.8),  // High
      ];

      const newHeights = ranges.map(index => {
        const value = dataArray[index] || 0;
        // Scale to a reasonable height range (10-45px)
        return Math.max(10, Math.min(45, (value / 255) * 45));
      });

      setBarHeights(newHeights);
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.7;
    }
  }, [isMuted]);

  // Track progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(progress);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [nextTrack]);

  return (
    <motion.div
      className="w-full max-w-xs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} />
      
      <div 
        className="rounded-2xl p-4"
        style={{
          background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)",
          boxShadow: "0 10px 40px hsl(var(--deep-purple) / 0.4)",
        }}
      >
        {/* Visualizer */}
        <div className="flex items-end justify-center gap-1 h-12 mb-4">
          {barHeights.map((height, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-romantic-red to-soft-pink rounded-full"
              animate={{ height: isPlaying ? height : 10 }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Track info */}
        <div className="text-center mb-4">
          <motion.div
            key={currentTrack}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="font-display text-lg text-foreground">
              {playlist[currentTrack].title}
            </p>
            <p className="text-sm text-muted-foreground">
              {playlist[currentTrack].artist}
            </p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-muted rounded-full mb-4 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-romantic-red to-accent rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleMute}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={prevTrack}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(var(--romantic-red)) 0%, hsl(var(--soft-pink)) 100%)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </motion.button>

          <button
            onClick={nextTrack}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <div className="p-2 text-accent">
            <Music className="w-5 h-5" />
          </div>
        </div>

        {/* Note about audio */}
        <p className="text-xs text-center text-muted-foreground/60 mt-3 font-serif italic">
          Every song, a feeling I have for you ♥
        </p>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;

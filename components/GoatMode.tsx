import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GoatModeProps {
  onClose: () => void;
}

const GoatMode: React.FC<GoatModeProps> = ({ onClose }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Riff de Guitarra / Risada do Crazy Train
    const audioUrl = "https://www.myinstants.com/media/sounds/ozzy-crazy-train-laugh.mp3"; 
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.8; // Aumentado o volume para mais impacto
    
    audioRef.current.play().catch(e => console.error("Audio play failed", e));

    audioRef.current.onended = onClose;
    const timer = setTimeout(onClose, 4500);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(0)" }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black overflow-hidden cursor-pointer"
      onClick={onClose}
    >
      {/* 1. Background Caótico (Heavy Metal) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black animate-pulse"></div>
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* Lightning Strobe Effect */}
      <motion.div 
        animate={{ opacity: [0, 0.2, 0, 0.4, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.5 }}
        className="absolute inset-0 bg-white mix-blend-overlay pointer-events-none"
      />

      {/* Container Principal */}
      <div className="relative flex flex-col items-center justify-center z-20">
        
        {/* Texto G.O.A.T - Estilo Capa de Álbum */}
        <motion.h1 
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-600 via-red-800 to-black font-mono mb-6 drop-shadow-[0_0_25px_rgba(220,38,38,0.8)] tracking-tighter relative"
          style={{ WebkitTextStroke: "2px #500" }}
        >
          THE G.O.A.T.
          {/* Efeito Glitch no Texto */}
          <span className="absolute inset-0 text-red-500 opacity-50 animate-pulse -translate-x-1 -translate-y-1 mix-blend-difference" aria-hidden="true">THE G.O.A.T.</span>
        </motion.h1>

        {/* Imagem do Ozzy - Estilo Gritty/High Contrast */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative group"
        >
            {/* Moldura de Sangue/Fogo */}
            <div className="absolute -inset-2 bg-gradient-to-br from-red-600 to-black rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            
            <motion.img 
                animate={{ 
                    rotate: [-1, 1, -1],
                    scale: [1, 1.02, 1],
                    x: [-2, 2, -2]
                }}
                transition={{ 
                    duration: 0.1, 
                    repeat: Infinity 
                }}
                src="https://imagens.ebc.com.br/bEiKmlxgU0tTMMig6y35kRpZ3fE=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/2025/07/22/ozzy03.jpg?itok=m5vGGmns" 
                alt="Ozzy Osbourne Prince of Darkness" 
                className="relative w-full max-w-lg md:max-w-2xl rounded border-4 border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,1)] grayscale-[20%] contrast-[1.2] brightness-90 sepia-[30%] hue-rotate-[-10deg]"
            />

            {/* Olhos Brilhantes (Efeito CSS) - Posição aproximada para dar um ar sinistro */}
            <div className="absolute inset-0 bg-red-500/10 mix-blend-color-burn pointer-events-none"></div>
        </motion.div>

        {/* Subtexto */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
            <p className="text-red-500 font-mono text-2xl md:text-3xl font-black bg-black px-6 py-2 border-2 border-red-900 uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(220,38,38,0.5)] transform -skew-x-12">
            🤘 PRINCE OF DARKNESS 🤘
            </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default GoatMode;
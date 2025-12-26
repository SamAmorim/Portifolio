import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DragonEffectProps {
  onComplete: () => void;
}

const DragonEffect: React.FC<DragonEffectProps> = ({ onComplete }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioUrl = "https://www.myinstants.com/media/sounds/dragon-roar.mp3"; 
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.7;
    // Tenta tocar, mas lida com erros de autoplay
    audioRef.current.play().catch(e => console.error("Dragon audio failed", e));

    const timer = setTimeout(onComplete, 6000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      onClick={onComplete} 
      className="fixed inset-0 z-[99999] overflow-hidden cursor-pointer"
      title="Clique para parar o terremoto!"
    >
      {/* 
        O Dragão voando.
        Fixed Y positioning to center screen (approx 50vh - half height).
        Simplified animation to prevent blinking.
      */}
      <motion.img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHFpcnd6MzJ5bXh3bWpheGhjdjJmc21vY3Z3bmJna3B3M3dlOGh0biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/14wCd5tKL4zV7y/giphy.gif"
        alt="Flying Dragon"
        initial={{ x: "110vw", y: "40vh", scale: 0.8 }}
        animate={{ 
          x: "-100vw", 
          y: ["40vh", "50vh", "45vh"], // Movimento suave próximo ao centro
        }}
        transition={{ 
          duration: 5, 
          ease: "linear",
          times: [0, 0.5, 1] // Distribuição do tempo da animação Y
        }}
        className="absolute w-[500px] md:w-[800px] h-auto object-contain drop-shadow-2xl filter brightness-75 contrast-125 pointer-events-none"
        style={{ top: 0 }} // Garante que o positioning seja relativo ao viewport
      />

      {/* Sombra no chão */}
      <motion.div
         initial={{ x: "110vw", opacity: 0 }}
         animate={{ 
            x: "-100vw", 
            opacity: [0, 0.4, 0]
         }}
         transition={{ 
            duration: 5, 
            ease: "linear",
         }}
         className="absolute bottom-[10vh] w-[500px] h-[60px] bg-black/50 blur-3xl rounded-[100%] pointer-events-none"
      />
      
      {/* Texto de instrução sutil */}
      <div className="absolute bottom-10 w-full text-center text-white/50 font-mono text-sm animate-pulse pointer-events-none">
        [ CLIQUE PARA PARAR O CAOS ]
      </div>
    </div>
  );
};

export default DragonEffect;
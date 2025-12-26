import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface D20RollerProps {
  onClose: () => void;
}

const D20Roller: React.FC<D20RollerProps> = ({ onClose }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(true);
  const [isCritical, setIsCritical] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lógica de Rolagem
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let timeoutId: ReturnType<typeof setTimeout>;

    // Inicia a animação de números aleatórios
    intervalId = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 20) + 1);
    }, 50);

    // Para após 1.5 segundos e define o número final
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      const finalNumber = Math.floor(Math.random() * 20) + 1;
      // const finalNumber = 20; // Debug para testar fogos
      setCurrentNumber(finalNumber);
      setIsRolling(false);
      
      if (finalNumber === 20) {
        setIsCritical(true);
      }
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  // Lógica de Fogos de Artifício (Canvas)
  useEffect(() => {
    if (!isCritical || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      
      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravidade leve
        this.alpha -= 0.01;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const createExplosion = (x: number, y: number) => {
      const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Criar explosões aleatórias
    const autoExplode = setInterval(() => {
        createExplosion(
            Math.random() * canvas.width, 
            Math.random() * canvas.height * 0.8
        );
    }, 400);

    // Loop de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(autoExplode);
    };
  }, [isCritical]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    >
      {/* Canvas Layer para Fogos */}
      {isCritical && (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 pointer-events-none z-0"
        />
      )}

      <div className="relative z-10 flex flex-col items-center">
        {/* SVG D20 Shape */}
        <motion.div
            animate={isRolling ? { 
                rotate: [0, -10, 10, -10, 0],
                x: [0, -5, 5, -5, 0],
                scale: [1, 1.1, 1]
            } : { 
                scale: isCritical ? [1, 1.5, 1.2] : 1,
                rotate: 0 
            }}
            transition={isRolling ? { 
                duration: 0.2, repeat: Infinity 
            } : { 
                duration: 0.5, type: "spring" 
            }}
            className="relative w-64 h-64 flex items-center justify-center"
        >
             {/* D20 Polygon Svg */}
             <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-2xl ${isCritical ? 'text-amber-500' : 'text-primary-600'} transition-colors duration-500`}>
                <path 
                    d="M50 5 L93 25 L93 75 L50 95 L7 75 L7 25 Z" 
                    fill="currentColor" 
                    stroke="white" 
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="opacity-90"
                />
                {/* Facetas internas para efeito 3D simples */}
                <path d="M50 5 L50 50 L93 25" fill="black" fillOpacity="0.1" />
                <path d="M50 5 L7 25 L50 50" fill="black" fillOpacity="0.2" />
                <path d="M7 25 L7 75 L50 50" fill="black" fillOpacity="0.3" />
                <path d="M7 75 L50 95 L50 50" fill="black" fillOpacity="0.1" />
                <path d="M50 95 L93 75 L50 50" fill="black" fillOpacity="0.2" />
                <path d="M93 75 L93 25 L50 50" fill="black" fillOpacity="0.3" />
             </svg>
             
             {/* Número */}
             <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-mono font-black text-6xl text-white ${isCritical ? 'animate-bounce' : ''}`}>
                    {currentNumber}
                </span>
             </div>
        </motion.div>

        {/* Texto de Status */}
        <AnimatePresence>
            {!isRolling && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                >
                    {isCritical ? (
                        <div>
                             <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse tracking-tighter uppercase">
                                Critical Hit!
                            </h2>
                            <p className="text-white font-mono mt-2">Natural 20 - Executing Perfect Deploy...</p>
                        </div>
                    ) : (
                        <p className="text-zinc-300 font-mono text-xl">
                            {currentNumber === 1 ? "Critical Miss..." : "Skill Check Result"}
                        </p>
                    )}
                    <p className="text-zinc-500 text-xs mt-4 uppercase tracking-widest">[ Clique para fechar ]</p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default D20Roller;
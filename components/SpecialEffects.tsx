import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

type EffectType = 'starwars' | 'cats' | 'nerd' | 'music' | 'science' | 'math' | 'astronomy' | null;

interface SpecialEffectsProps {
  effect: EffectType;
  onClose: () => void;
}

// --- EFEITO 1: SABRE DE LUZ (STAR WARS) - REFEITO COM PHYSICS ---
const LightsaberEffect = () => {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // Spring physics para suavizar o movimento (dá peso ao sabre)
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Rotação baseada na velocidade horizontal (Swing effect)
  const rotate = useMotionValue(0);
  const lastX = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calcular rotação baseada na inércia
      const velocity = e.clientX - lastX.current;
      const targetRotation = Math.max(Math.min(velocity * 1.5, 60), -60); // Limita a 60 graus
      rotate.set(targetRotation);
      
      lastX.current = e.clientX;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, rotate]);

  // Transforma a rotação bruta em algo mais suave
  const smoothRotate = useSpring(rotate, { damping: 20, stiffness: 200 });

  return (
    <>
      <motion.div 
        className="pointer-events-none fixed z-[9999] top-0 left-0"
        style={{ x, y, rotate: smoothRotate }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Lâmina com Glow Intenso */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-4 h-[500px] origin-bottom -translate-y-[60px]">
                {/* Core Branco Puro */}
                <div className="absolute inset-0 bg-white rounded-t-full z-20 animate-pulse-fast"></div>
                {/* Glow Vermelho Interno */}
                <div className="absolute inset-[-4px] bg-red-500 rounded-t-full blur-[4px] z-10 opacity-80"></div>
                {/* Glow Vermelho Externo (Aura) */}
                <div className="absolute inset-[-15px] bg-red-600 rounded-t-full blur-[20px] z-0 opacity-60"></div>
            </div>

            {/* Guarda (Crossguard) */}
            <div className="absolute left-1/2 bottom-[60px] -translate-x-1/2 w-24 h-3 bg-zinc-800 rounded flex items-center justify-center z-30 shadow-lg">
                {/* Lâminas laterais */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-1 bg-white blur-[1px] rounded-l-full shadow-[0_0_10px_red]"></div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-1 bg-white blur-[1px] rounded-r-full shadow-[0_0_10px_red]"></div>
            </div>

            {/* Cabo Detalhado */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-8 h-[60px] bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 rounded-b-md z-30 border-2 border-zinc-900 shadow-2xl">
                <div className="w-full h-1 bg-black mt-2 opacity-50"></div>
                <div className="w-full h-1 bg-black mt-1 opacity-50"></div>
                <div className="w-full h-1 bg-black mt-1 opacity-50"></div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-900"></div>
            </div>
        </div>
      </motion.div>
      
      {/* Efeito de Bloom/Ambiente Global em vermelho */}
      <div className="fixed inset-0 bg-red-500/5 pointer-events-none z-[9000] mix-blend-overlay animate-pulse"></div>
    </>
  );
};

// --- EFEITO 2: GATOS VOADORES COM FÍSICA E ROTAÇÃO ---
const BouncingCatsEffect = () => {
  const [cats, setCats] = useState<{
    id: number, x: number, y: number, vx: number, vy: number, 
    rotation: number, vRotation: number, emoji: string, scale: number 
  }[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const emojis = ['🐱', '🐈', '😹', '😽', '🐈‍⬛', '🦁', '🐯'];
    const newCats = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 25, // Mais rápido
      vy: (Math.random() - 0.5) * 25,
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10, // Velocidade de rotação
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      scale: 0.5 + Math.random() * 1.5
    }));
    setCats(newCats);

    const animate = () => {
      setCats(prevCats => prevCats.map(cat => {
        let { x, y, vx, vy, rotation, vRotation } = cat;
        
        x += vx;
        y += vy;
        rotation += vRotation;
        
        // Colisão com paredes
        if (x <= 0 || x >= window.innerWidth - 60) {
          vx *= -1;
          vRotation = (Math.random() - 0.5) * 20; // Gira loucamente ao bater
        }
        if (y <= 0 || y >= window.innerHeight - 60) {
          vy *= -1;
          vRotation = (Math.random() - 0.5) * 20;
        }

        return { ...cat, x, y, vx, vy, rotation, vRotation };
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {cats.map(cat => (
        <div 
          key={cat.id}
          className="absolute"
          style={{ 
              transform: `translate(${cat.x}px, ${cat.y}px) rotate(${cat.rotation}deg) scale(${cat.scale})`,
              fontSize: '4rem',
              willChange: 'transform'
          }}
        >
          {cat.emoji}
        </div>
      ))}
    </div>
  );
};

// --- EFEITO 3: MATRIX RAIN (NERD) - APPRIMORADO ---
const MatrixRainEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.ceil(columns)).fill(1);

    const draw = () => {
      // Fundo semi-transparente para dar efeito de rastro
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Cor verde matrix brilhante
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillStyle = '#0F0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Resetar drop aleatoriamente para dar variedade
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 30);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9998] opacity-90 pointer-events-none mix-blend-screen" />;
};

// --- EFEITO 4: MOUSE TRAIL (INTERATIVO) ---
// Em vez de apenas flutuar, eles nascem do mouse!
const MouseTrailEffect = ({ type }: { type: 'music' | 'science' | 'math' | 'astronomy' }) => {
    const [particles, setParticles] = useState<{
        id: number;
        x: number;
        y: number;
        symbol: string;
        color: string;
        rotation: number;
        scale: number;
    }[]>([]);
    
    const mousePos = useRef({ x: 0, y: 0 });
    const lastSpawn = useRef(0);

    const config = {
        music: { 
            symbols: ['♪', '♫', '♬', '♭', '♮', '🎼', '🎹'], 
            colors: ['text-amber-500', 'text-pink-500', 'text-yellow-400'] 
        },
        science: { 
            symbols: ['⚛', '⚗', '🧬', '🧪', '🔬', '🔭'], 
            colors: ['text-emerald-500', 'text-green-400', 'text-teal-300'] 
        },
        math: { 
            symbols: ['∑', '∫', 'π', '√', '∞', '≠', '≈', '÷'], 
            colors: ['text-cyan-500', 'text-blue-400', 'text-indigo-300'] 
        },
        astronomy: { 
            symbols: ['★', '☄', '🌑', '✨', '🪐', '🌍', '🛸'], 
            colors: ['text-white', 'text-purple-300', 'text-indigo-200'] 
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            
            // Spawn rate limiter (a cada 20ms no max)
            const now = Date.now();
            if (now - lastSpawn.current > 40) {
                spawnParticle(e.clientX, e.clientY);
                lastSpawn.current = now;
            }
        };

        const spawnParticle = (x: number, y: number) => {
            const theme = config[type];
            const symbol = theme.symbols[Math.floor(Math.random() * theme.symbols.length)];
            const color = theme.colors[Math.floor(Math.random() * theme.colors.length)];
            
            const newParticle = {
                id: Date.now(),
                x: x + (Math.random() - 0.5) * 40, // Leve dispersão
                y: y + (Math.random() - 0.5) * 40,
                symbol,
                color,
                rotation: Math.random() * 360,
                scale: 0.5 + Math.random() * 1.5
            };

            setParticles(prev => [...prev.slice(-40), newParticle]); // Manter max 40
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [type]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, x: p.x, y: p.y, scale: 0, rotate: p.rotation }}
                        animate={{ 
                            opacity: 0, 
                            y: p.y - 150, // Flutuar para cima
                            x: p.x + (Math.random() - 0.5) * 100, // Deriva lateral
                            scale: p.scale,
                            rotate: p.rotation + 180
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        onAnimationComplete={() => {
                             setParticles(prev => prev.filter(item => item.id !== p.id));
                        }}
                        className={`absolute text-2xl font-bold ${p.color}`}
                    >
                        {p.symbol}
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {/* Texto de Instrução Central */}
            {particles.length === 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 animate-pulse text-sm font-mono">
                    Mova o mouse para criar magia...
                </div>
            )}
        </div>
    );
}

// --- COMPONENTE PRINCIPAL ---
const SpecialEffects: React.FC<SpecialEffectsProps> = ({ effect, onClose }) => {
  if (!effect) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-[2px] cursor-pointer"
        onClick={onClose}
      >
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 px-6 py-2 rounded-full text-white font-mono text-sm animate-pulse pointer-events-none select-none backdrop-blur-md shadow-lg">
              MODO CAOS ATIVADO: Clique na tela para sair
          </div>
      </motion.div>

      {effect === 'starwars' && <LightsaberEffect />}
      {effect === 'cats' && <BouncingCatsEffect />}
      {effect === 'nerd' && <MatrixRainEffect />}
      {(effect === 'music' || effect === 'science' || effect === 'math' || effect === 'astronomy') && (
          <MouseTrailEffect type={effect} />
      )}
    </>
  );
};

export default SpecialEffects;

import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowRight, Activity, Github } from 'lucide-react';
import { heroData } from '../data';
import D20Roller from './D20Roller';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const [showD20, setShowD20] = useState(false);
  const { language } = useLanguage();
  const data = heroData[language];
  
  // --- Stardew Valley Easter Egg Logic ---
  const [clickCount, setClickCount] = useState(0);
  const [isAlienOpen, setIsAlienOpen] = useState(false);
  const nameControls = useAnimation();

  const handleNameClick = async () => {
    // Efeito de "Knock" (Treme o texto como uma porta batendo)
    await nameControls.start({
      x: [0, -5, 5, -5, 5, 0],
      scale: [1, 0.9, 1],
      color: ["#18181b", "#ef4444", "#18181b"], // Pisca vermelho levemente
      transition: { duration: 0.3 }
    });

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 10) {
      setIsAlienOpen(true);
      setClickCount(0); // Reset
    }
  };
  // -------------------------------------

  // Animation Variants for Staggering
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Atraso entre cada filho
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 md:pt-0">
      
      {/* D20 Modal Overlay */}
      <AnimatePresence>
        {showD20 && <D20Roller onClose={() => setShowD20(false)} />}
      </AnimatePresence>

      {/* --- ALIEN CLASSIC GLOBAL OVERLAY --- */}
      <AnimatePresence>
        {isAlienOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAlienOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          >
             <div className="relative flex flex-col items-center justify-center p-8">
                
                {/* Balão de Fala */}
                <motion.div 
                  initial={{ scale: 0, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-8 bg-white border-4 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 rounded-2xl max-w-sm text-center relative"
                >
                   <h3 className="font-black text-2xl text-zinc-900 mb-2 font-mono">SAUDAÇÕES! 🖖</h3>
                   <p className="font-mono text-zinc-600 font-bold leading-tight">
                     Estou compilando o futuro.<br/>Volte em ano-luz!
                   </p>
                   {/* Seta do Balão */}
                   <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-b-4 border-r-4 border-zinc-900 rotate-45"></div>
                </motion.div>

                {/* Alien Clássico SVG */}
                <motion.div
                   initial={{ scale: 0.5, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ type: "spring", bounce: 0.5 }}
                   className="relative"
                >
                   <motion.svg 
                      viewBox="0 0 100 100" 
                      className="w-48 h-48 drop-shadow-2xl filter drop-shadow-[0_0_25px_rgba(74,222,128,0.6)]" 
                      style={{ shapeRendering: 'geometricPrecision' }}
                      animate={{ y: [0, -20, 0], rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                   >
                      {/* Cabeça Clássica (Forma de Pêra Invertida) */}
                      <path 
                        d="M50 5 C 20 5, 2 35, 12 65 C 22 90, 40 98, 50 98 C 60 98, 78 90, 88 65 C 98 35, 80 5, 50 5 Z" 
                        fill="#4ade80" 
                        stroke="#166534" 
                        strokeWidth="3" 
                      />
                      
                      {/* Olhos Pretos Grandes (Almond Shape) */}
                      <ellipse cx="32" cy="45" rx="13" ry="19" transform="rotate(25 32 45)" fill="black" />
                      <ellipse cx="68" cy="45" rx="13" ry="19" transform="rotate(-25 68 45)" fill="black" />
                      
                      {/* Reflexo nos Olhos (Vida) */}
                      <circle cx="26" cy="38" r="3" fill="white" opacity="0.7" />
                      <circle cx="62" cy="38" r="3" fill="white" opacity="0.7" />

                      {/* Narinas (Mínimas) */}
                      <circle cx="48" cy="68" r="1" fill="#166534" opacity="0.5" />
                      <circle cx="52" cy="68" r="1" fill="#166534" opacity="0.5" />

                      {/* Boca (Linha Sutil) */}
                      <path d="M42 82 Q 50 85, 58 82" stroke="#166534" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
                   </motion.svg>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-white/50 text-xs font-mono mt-8 uppercase tracking-widest"
                >
                  [ Clique em qualquer lugar para fechar ]
                </motion.p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large Gradient Orb 1 */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-900/10 blur-[120px] animate-pulse-slow" />
        {/* Large Gradient Orb 2 */}
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        {/* Grid Lines - Data Visualization Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content with Staggered Animation */}
        <div className="order-2 lg:order-1 relative z-50">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data.openToWork && (
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-2 mb-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        STATUS: ACTIVE
                    </span>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono font-medium hidden sm:inline-block">
                     // {data.openToWorkText}
                </span>
              </motion.div>
            )}
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tight text-zinc-900 dark:text-white relative">
              
              <div className="relative inline-block">
                
                {/* A "Porta" (O Nome) */}
                <motion.span 
                  animate={nameControls}
                  onClick={handleNameClick}
                  className="block cursor-pointer select-none relative z-10"
                  title="Clique 10 vezes..."
                >
                  {data.logoName}
                </motion.span>

              </div>
              
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 via-zinc-800 to-zinc-900 dark:from-zinc-400 dark:via-zinc-200 dark:to-white">
                {data.logoSurname}.
              </span>
            </motion.h1>
            
            <motion.div variants={itemVariants} className="h-1 w-24 bg-primary-500 mb-8 rounded-full"></motion.div>

            <motion.p variants={itemVariants} className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light">
              {data.description}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
              {/* Primary CTA */}
              <a 
                href="#projects" 
                className="relative z-50 cursor-pointer group px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-bold rounded-lg overflow-hidden shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all hover:-translate-y-1 text-center"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {data.primaryCtaText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              {/* LinkedIn CTA */}
              <a 
                href={data.secondaryCtaLink} 
                target="_blank" 
                rel="noreferrer" 
                className="relative z-50 cursor-pointer px-8 py-4 glass text-zinc-800 dark:text-zinc-200 font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all flex items-center justify-center gap-2 group"
              >
                {data.secondaryCtaText}
                <span className="text-xs font-mono text-zinc-400 group-hover:text-primary-400 transition-colors">↗</span>
              </a>

              {/* GitHub Button */}
              {data.githubLink && (
                  <a 
                    href={data.githubLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="relative z-50 cursor-pointer p-4 glass text-zinc-800 dark:text-zinc-200 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-500 hover:bg-zinc-500/10 transition-all flex items-center justify-center group"
                    aria-label="GitHub Profile"
                  >
                    <Github size={24} />
                  </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Visual Content - Tech/Cyber Aesthetics */}
        <div className="order-1 lg:order-2 flex justify-center perspective-1000 relative z-10">
           
           {/* Background Circle Mesh */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-zinc-200 dark:border-zinc-800 rounded-full opacity-20 animate-spin-slow pointer-events-none"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-dashed border-zinc-300 dark:border-zinc-700 rounded-full opacity-20 animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-md aspect-[4/5]"
          >
             {/* Tech Badge 1 (RPG Style) */}
            <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-8 -right-4 md:-right-8 p-4 glass rounded-xl z-20 border-l-2 border-l-primary-500 backdrop-blur-xl shadow-2xl pointer-events-none"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                        <data.floatCard1.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{data.floatCard1.label}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{data.floatCard1.text}</p>
                    </div>
                </div>
            </motion.div>
            
            {/* Tech Badge 2 (RPG Style) */}
            <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -left-4 md:-left-8 p-4 glass rounded-xl z-20 border-l-2 border-l-emerald-500 backdrop-blur-xl shadow-2xl pointer-events-none"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg">
                        <data.floatCard2.icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{data.floatCard2.label}</p>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">{data.floatCard2.text}</p>
                    </div>
                </div>
            </motion.div>

            {/* Main Image Container */}
            <div 
                onClick={() => setShowD20(true)}
                className="absolute inset-4 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
                title="Roll for Initiative!"
            >
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent z-20 pointer-events-none animate-[scan_3s_linear_infinite]"></div>
                
                <img 
                  src={data.heroImage} 
                  alt={data.title} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                />
                
                {/* Code Overlay on Image - NERD Easter Eggs */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <div className="flex items-end justify-between border-b border-white/20 pb-4">
                        <div>
                            <h3 className="text-white font-bold text-xl">{data.title} {data.titleHighlight}</h3>
                            <div className="flex flex-col gap-1 mt-1">
                              {/* Star Wars Ref */}
                              <p className="text-primary-400 text-[10px] font-mono">> PROTOCOL: <span className="text-white">66_EXECUTE</span></p> 
                              {/* LOTR Ref */}
                              <p className="text-emerald-400 text-[10px] font-mono">> SPEAK_FRIEND: <span className="text-white">MELLON</span></p>
                            </div>
                        </div>
                        <div className="text-right">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto mb-1"></div>
                           <p className="text-zinc-400 text-[10px] font-mono">HOLOCRON_ACTIVE</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Decorative Frame */}
            <div className="absolute inset-0 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
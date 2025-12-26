import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

// Componente para o Efeito 3D Tilt
const TiltCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer spring physics to reduce motion sickness
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    // Calculate rotation (inverted for natural feel) - reduced intensity
    x.set(xPct * 10);
    y.set(yPct * 10);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useMotionTemplate`${mouseY}deg`;
  const rotateY = useMotionTemplate`${mouseX}deg`; 

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative group h-full"
    >
      <motion.div
        style={{
          rotateX: rotateX, 
          rotateY: rotateY, 
        }}
        className="h-full glass-card rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 hover:border-primary-500/50 bg-white/50 dark:bg-zinc-900/40 flex flex-col"
      >
        {/* Card Header/Image */}
        <div style={{ transform: "translateZ(30px)" }} className="relative h-56 sm:h-64 bg-zinc-200 dark:bg-black overflow-hidden">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity z-10" />
            
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            
            <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider rounded border border-white/10 shadow-lg">
                {project.category}
                </span>
            </div>

            {/* Link wrapper for the whole card on mobile for better UX */}
            <a href={project.link || "#"} className="absolute inset-0 z-30" aria-label={`Ver projeto ${project.title}`}></a>
        </div>
        
        {/* Card Body */}
        <div style={{ transform: "translateZ(20px)" }} className="p-6 sm:p-8 flex flex-col flex-grow relative bg-white/50 dark:bg-zinc-900/50">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-primary-500 transition-colors">
                  {project.title}
              </h3>
              
              {/* External Link Icon - Visible always on mobile, or hover on desktop */}
              <a 
                 href={project.link || "#"}
                 className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-white group-hover:bg-primary-500 transition-all duration-300"
              >
                  <ArrowUpRight size={18} />
              </a>
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm leading-relaxed flex-grow">
                {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {project.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono font-medium px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
                    #{tag}
                </span>
                ))}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const data = projectsData[language];

  return (
    <section id="projects" className="py-24 bg-zinc-50 dark:bg-transparent relative z-20">
      <div className="container mx-auto px-6">
        <SectionHeading 
            title={language === 'pt' ? "Laboratório de Projetos" : "Project Laboratory"}
            subtitle={language === 'pt' ? "Deploy & Resultados" : "Deploy & Results"} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {data.map((project) => (
            <TiltCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
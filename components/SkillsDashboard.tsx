import React, { useState } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, ReferenceArea, LabelList, Legend, ZAxis
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import JungleMode from './JungleMode'; // Import Jungle Easter Egg
import { Globe2, Cpu, Code2, Users, MapPin } from 'lucide-react';
import { 
  skillsClusterData, skillColors, hardSkillsList,
  impactMetrics, globalLocations
} from '../data';
import { SkillCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const color = skillColors[data.category as SkillCategory];
    
    return (
      <div className="glass-card p-3 rounded-xl shadow-2xl z-50 min-w-[160px] border-l-4" style={{ borderLeftColor: color }}>
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-zinc-200 dark:border-zinc-700">
          <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
          <p className="font-bold text-zinc-900 dark:text-white text-sm font-mono">{data.name}</p>
        </div>
        <p className="text-xs font-semibold" style={{ color: color }}>{data.category}</p>
      </div>
    );
  }
  return null;
};

// Componente de Mapa de Pontos Abstrato (SVG)
const DottedMapBackground = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" className="fill-current text-zinc-900 dark:text-white" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#dotPattern)" />
    {/* Linhas de Conexão Abstratas */}
    <path d="M50 50 Q 150 150 250 50" stroke="currentColor" fill="none" className="text-zinc-900 dark:text-white opacity-10" />
    <path d="M200 200 Q 300 100 400 200" stroke="currentColor" fill="none" className="text-zinc-900 dark:text-white opacity-10" />
  </svg>
);

const SkillsDashboard: React.FC = () => {
  const [jungleClicks, setJungleClicks] = useState(0);
  const [showJungleMode, setShowJungleMode] = useState(false);
  const { language } = useLanguage();

  // Load language specific data
  const currentClusterData = skillsClusterData[language];
  const currentMetrics = impactMetrics[language];
  const currentLocations = globalLocations[language];

  const handleTitleClick = () => {
    // Se já estiver ativo, clicar desativa (Toggle OFF)
    if (showJungleMode) {
      setShowJungleMode(false);
      setJungleClicks(0);
      return;
    }

    // Contagem para ativar
    const newCount = jungleClicks + 1;
    setJungleClicks(newCount);
    
    // Ativar com 5 cliques
    if (newCount >= 5) {
      setShowJungleMode(true);
      setJungleClicks(0);
    }
  };

  return (
    <section id="skills" className="py-24 bg-zinc-50 dark:bg-darkbg relative overflow-hidden">
      
      {/* Jungle Mode Overlay */}
      <AnimatePresence>
        {showJungleMode && (
          <JungleMode onClose={() => setShowJungleMode(false)} />
        )}
      </AnimatePresence>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-gradient-to-b from-primary-100 to-transparent dark:from-primary-900/20 dark:to-transparent rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
            title={language === 'pt' ? "Ecossistema de Dados" : "Data Ecosystem"}
            subtitle="Analytics Dashboard" 
            onTitleClick={handleTitleClick}
        />

        {/* TOP ROW: KEY ACHIEVEMENTS (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {currentMetrics.map((kpi, idx) => (
                <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-2xl border ${kpi.border} ${kpi.bg} backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group`}
                >
                    <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <kpi.icon size={80} className={kpi.color} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <kpi.icon size={20} className={kpi.color} />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">{kpi.suffix}</span>
                        </div>
                        <h4 className={`text-4xl font-black ${kpi.color} tracking-tight mb-1`}>
                            {kpi.value}
                        </h4>
                        <h5 className="font-bold text-zinc-800 dark:text-white text-sm mb-1">{kpi.label}</h5>
                        <p className="text-xs text-zinc-500 leading-snug">{kpi.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart - Cluster Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card rounded-3xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 min-h-[500px]"
          >
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <Cpu size={18} className="text-zinc-500" />
                <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 font-mono">
                  SKILL_CLUSTER_ANALYSIS_V2
                </h3>
              </div>
            </div>

            <div className="flex-grow relative w-full bg-white/40 dark:bg-black/20">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 50, right: 30, bottom: 40, left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#71717a" />
                  <ReferenceArea x1={-110} x2={0} y1={-10} y2={110} fill="#8b5cf6" fillOpacity={0.02} />
                  <ReferenceArea x1={0} x2={110} y1={-10} y2={110} fill="#6366f1" fillOpacity={0.02} />
                  <XAxis type="number" dataKey="x" domain={[-110, 110]} hide />
                  <YAxis type="number" dataKey="y" domain={[0, 110]} hide />
                  <ZAxis type="number" dataKey="z" range={[400, 1200]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3', strokeOpacity: 0.3 }} content={<CustomTooltip />} isAnimationActive={false} />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: '600', paddingTop: '10px', color: '#71717a', fontFamily: 'JetBrains Mono' }} />
                  <ReferenceLine x={0} stroke="#d4d4d8" strokeDasharray="4 4" strokeWidth={1} />
                  {Object.keys(skillColors).filter(cat => {
                      // Filter only categories present in currentClusterData to avoid duplicates in Legend if keys differ
                      return currentClusterData.some(d => d.category === cat);
                  }).map((cat) => (
                    <Scatter 
                        key={cat} 
                        name={cat} 
                        data={currentClusterData.filter(d => d.category === cat)} 
                        fill={skillColors[cat as SkillCategory]} 
                        shape="circle"
                        isAnimationActive={false}
                    >
                         <LabelList 
                            dataKey="name" 
                            position="top" 
                            offset={8}
                            className="fill-zinc-600 dark:fill-zinc-400 font-semibold"
                            style={{ 
                                fontSize: '9px', 
                                opacity: 0.9,
                                fontFamily: 'JetBrains Mono, monospace',
                                pointerEvents: 'none',
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)' 
                            }} 
                         />
                    </Scatter>
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Side Card - Global Collaboration (Renamed & Redesigned) */}
          <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-6 h-full"
          >
              {/* Global Collaboration Card */}
              <div className="glass-card rounded-3xl overflow-hidden flex-grow border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl flex flex-col relative group">
                 {/* Decorative abstract map */}
                 <DottedMapBackground />
                 
                 <div className="relative z-10 px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-black/80 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                          <Globe2 size={16} className="text-primary-500" />
                          <h3 className="font-bold text-sm text-zinc-700 dark:text-zinc-200 tracking-tight">
                            {language === 'pt' ? 'Colaboração Global' : 'Global Collaboration'}
                          </h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Online</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                      {language === 'pt' ? 'Atuação em times alocados nos países' : 'Acting in teams allocated across countries'}
                    </p>
                 </div>
                 
                 <div className="relative z-10 p-3 flex-grow flex flex-col justify-center">
                    <div className="space-y-2">
                       {currentLocations.map((loc, idx) => (
                             <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-700/50 hover:border-primary-500/30 transition-all group/item">
                                 <div className="flex items-center gap-3">
                                     {/* Flag/Icon Container */}
                                     <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-lg shadow-sm">
                                        {loc.flag}
                                     </div>
                                     
                                     <div>
                                         <h4 className="font-bold text-xs text-zinc-800 dark:text-zinc-200 leading-tight mb-0.5">
                                           {loc.city}, {loc.country}
                                         </h4>
                                         <div className="flex items-center gap-1.5">
                                            <Users size={10} className="text-zinc-400" />
                                            <span className="text-[10px] text-zinc-500 font-medium">{loc.role}</span>
                                         </div>
                                     </div>
                                 </div>
                                 
                                 <div className="flex flex-col items-end gap-1">
                                      <div className={`w-1.5 h-1.5 rounded-full ${loc.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} title={loc.status}></div>
                                      <MapPin size={10} className="text-zinc-300 dark:text-zinc-600" />
                                 </div>
                             </div>
                       ))}
                    </div>
                 </div>
                 
                 {/* Footer decoration */}
                 <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
              </div>

              {/* Tech Stack List - Compact */}
              <div className="glass-card p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
                 <p className="text-[10px] font-bold text-zinc-400 uppercase mb-3 font-mono flex items-center gap-2">
                      <Code2 size={12} /> Tech_Stack_Inventory
                  </p>
                  <div className="flex flex-wrap gap-2">
                     {hardSkillsList.map((skill, idx) => (
                         <span key={idx} className="px-2 py-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-[10px] font-medium text-zinc-600 dark:text-zinc-300 shadow-sm hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-default">
                             {skill}
                         </span>
                     ))}
                  </div>
              </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsDashboard;
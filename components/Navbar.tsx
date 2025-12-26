import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Terminal, Home, Briefcase, Cpu, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroData, footerData } from '../data';
import { useLanguage } from '../context/LanguageContext';

// Mapeamento de ícones para os links de navegação para a Sidebar
// Mapeia tanto nomes em PT quanto em EN
const iconMap: Record<string, React.ElementType> = {
  'Início': Home,
  'Home': Home,
  'Skills': Cpu,
  'Experiência': Briefcase,
  'Experience': Briefcase,
  'Projetos': Layers,
  'Projects': Layers,
};

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, toggleLanguage } = useLanguage();

  const currentNavLinks = footerData[language].navLinks;
  const logoName = heroData[language].logoName;

  // Sincronização de tema e ScrollSpy
  useEffect(() => {
    const handleScroll = () => {
      const sections = currentNavLinks.map(link => link.href.substring(1));
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Detecta se a seção está visível
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = '#' + section;
          }
        }
      }
      if (window.scrollY < 100) current = '#';
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark, currentNavLinks]);

  return (
    <>
      {/* =======================================================
          MOBILE NAVBAR (Top Bar - Visível apenas mobile)
         ======================================================= */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 glass-nav border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Mobile Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
              <Terminal size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-zinc-900 dark:text-white text-sm">
              {logoName}
            </span>
          </a>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2">
             {/* Language Switcher Mobile */}
             <button
               onClick={toggleLanguage}
               className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-bold"
               aria-label="Switch Language"
             >
               {language === 'pt' ? '🇧🇷' : '🇺🇸'}
             </button>

             <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-900 dark:text-white p-1"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {currentNavLinks.map((link, idx) => (
                  <motion.a 
                    key={link.name} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      text-base font-medium py-3 border-b border-zinc-100 dark:border-zinc-900/50
                      ${activeSection === link.href ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-zinc-600 dark:text-zinc-300'}
                    `}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* =======================================================
          DESKTOP SIDEBAR (Vertical - Visível apenas md+)
         ======================================================= */}
      <aside className="hidden md:flex flex-col justify-between items-center fixed left-0 top-0 bottom-0 w-20 z-50 glass-sidebar border-r border-zinc-200 dark:border-zinc-800 py-8 shadow-xl">
        
        {/* Sidebar Logo */}
        <a href="#" className="group relative flex items-center justify-center w-10 h-10 bg-zinc-900 dark:bg-white rounded-xl text-white dark:text-black shadow-lg shadow-primary-500/20 hover:scale-110 transition-transform duration-300">
           <Terminal size={20} strokeWidth={3} />
        </a>

        {/* Navigation Links */}
        <div className="flex flex-col gap-6 w-full px-4">
          {currentNavLinks.map((link) => {
            const Icon = iconMap[link.name] || Home; // Fallback para ícone
            const isActive = activeSection === link.href || (activeSection === '' && link.href === '#');

            return (
              <a 
                key={link.name} 
                href={link.href}
                className="relative group flex items-center justify-center w-full aspect-square"
                aria-label={link.name}
              >
                {/* Indicador Ativo (Barra lateral esquerda) */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActive"
                    className="absolute -left-4 w-1 h-8 bg-primary-500 rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Caixa do Ícone */}
                <div className={`
                    p-3 rounded-xl transition-all duration-300 relative z-10
                    ${isActive 
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' 
                        : 'text-zinc-400 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-primary-500 dark:hover:text-white'}
                `}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Tooltip (Hover) - Aparece ao lado */}
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-md opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50">
                    {link.name}
                    {/* Seta do Tooltip */}
                    <div className="absolute top-1/2 right-full -mt-1 -mr-px border-4 border-transparent border-r-zinc-900 dark:border-r-white"></div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-4">
          {/* Language Toggle Desktop */}
          <button 
            onClick={toggleLanguage}
            className="w-10 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full relative flex items-center px-1 transition-colors border border-zinc-300 dark:border-zinc-700"
            title="Mudar Idioma / Change Language"
          >
             <motion.div 
               className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] overflow-hidden"
               animate={{ x: language === 'pt' ? 0 : 16 }}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
             >
               {language === 'pt' ? '🇧🇷' : '🇺🇸'}
             </motion.div>
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-primary-500 dark:hover:text-white hover:ring-2 ring-primary-500/20 transition-all active:scale-95"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
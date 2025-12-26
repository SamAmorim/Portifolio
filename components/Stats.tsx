import React from 'react';
import { motion } from 'framer-motion';
import { statsData } from '../data';
import { useLanguage } from '../context/LanguageContext';

const Stats: React.FC = () => {
  const { language } = useLanguage();
  const data = statsData[language];

  return (
    <section className="py-12 bg-white dark:bg-black border-y border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {data.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-900 dark:text-white group-hover:scale-110 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300 shadow-sm">
                  <stat.icon size={28} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-1 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
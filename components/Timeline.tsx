import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { Table2, ArrowDown, Key, Terminal } from 'lucide-react';
import { timelineData } from '../data';
import { useLanguage } from '../context/LanguageContext';

// Função auxiliar para criar nomes de tabela estilo SQL
const toSnakeCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w-]+/g, '');
};

const DatabaseTable: React.FC<{ item: any, index: number, isLast: boolean }> = ({ item, index, isLast }) => {
  return (
    <div className="flex flex-col items-center relative z-10 w-full">
      
      {/* ER Diagram Entity (Table) - Visual Limpo e Técnico */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.2 }}
        className="w-full max-w-2xl bg-white dark:bg-[#0c0c0c] border border-zinc-300 dark:border-zinc-800 shadow-sm flex flex-col"
      >
        {/* Table Header - Schema Style */}
        <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-300 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-zinc-800 dark:text-zinc-100">
                <Table2 size={15} className="text-primary-600 dark:text-primary-500" />
                <span>dbo.{toSnakeCase(item.company)}</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
                <span className="font-bold">PK:</span> id
            </div>
        </div>

        {/* Table Content (Rows) */}
        <div className="font-mono text-xs">
            {/* Header Columns Definition */}
            <div className="grid grid-cols-12 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black/40 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                <div className="col-span-1 py-1.5 text-center border-r border-zinc-200 dark:border-zinc-800">PK</div>
                <div className="col-span-3 py-1.5 px-3 border-r border-zinc-200 dark:border-zinc-800">Column</div>
                <div className="col-span-2 py-1.5 px-3 border-r border-zinc-200 dark:border-zinc-800">Type</div>
                <div className="col-span-6 py-1.5 px-3">Value</div>
            </div>

            {/* Row 1: ID */}
            <div className="grid grid-cols-12 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <div className="col-span-1 py-2 flex justify-center items-center border-r border-zinc-100 dark:border-zinc-800 text-amber-500">
                    <Key size={10} />
                </div>
                <div className="col-span-3 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                    id
                </div>
                <div className="col-span-2 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 text-zinc-400">
                    int
                </div>
                <div className="col-span-6 py-2 px-3 text-blue-600 dark:text-blue-400 font-bold">
                    {item.id}
                </div>
            </div>

            {/* Row 2: Role (Cargo) */}
            <div className="grid grid-cols-12 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                 <div className="col-span-1 py-2 border-r border-zinc-100 dark:border-zinc-800"></div>
                 <div className="col-span-3 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                    role
                 </div>
                 <div className="col-span-2 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 text-zinc-400">
                    varchar
                 </div>
                 <div className="col-span-6 py-2 px-3 text-emerald-600 dark:text-emerald-500 font-medium">
                    "{item.title}"
                 </div>
            </div>

            {/* Row 3: Period (Período) */}
            <div className="grid grid-cols-12 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                 <div className="col-span-1 py-2 border-r border-zinc-100 dark:border-zinc-800"></div>
                 <div className="col-span-3 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                    period
                 </div>
                 <div className="col-span-2 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 text-zinc-400">
                    date
                 </div>
                 <div className="col-span-6 py-2 px-3 text-purple-600 dark:text-purple-400">
                    {item.year}
                 </div>
            </div>

            {/* Row 4: Description (Descrição) */}
            <div className="grid grid-cols-12 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                 <div className="col-span-1 py-2 border-r border-zinc-100 dark:border-zinc-800"></div>
                 <div className="col-span-3 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                    description
                 </div>
                 <div className="col-span-2 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 text-zinc-400">
                    text
                 </div>
                 <div className="col-span-6 py-2 px-3 text-zinc-500 dark:text-zinc-400 leading-relaxed text-[11px]">
                    {item.description}
                 </div>
            </div>

             {/* Row 5: Tech Stack */}
            <div className="grid grid-cols-12 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                 <div className="col-span-1 py-2 border-r border-zinc-100 dark:border-zinc-800"></div>
                 <div className="col-span-3 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                    stack
                 </div>
                 <div className="col-span-2 py-2 px-3 border-r border-zinc-100 dark:border-zinc-800 text-zinc-400">
                    json
                 </div>
                 <div className="col-span-6 py-2 px-3">
                    <div className="flex flex-wrap gap-1">
                        {item.skills.slice(0, 4).map((s: string, i: number) => (
                            <span key={i} className="text-[10px] text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 px-1 rounded bg-zinc-50 dark:bg-zinc-900">{s}</span>
                        ))}
                    </div>
                 </div>
            </div>

        </div>
      </motion.div>

      {/* Simple Connector: Line + Arrow + 1:1 */}
      {!isLast && (
        <div className="h-12 flex flex-col items-center justify-start relative">
            <div className="w-px h-full bg-zinc-300 dark:bg-zinc-700 relative"></div>
            <ArrowDown size={14} className="text-zinc-300 dark:text-zinc-700 absolute bottom-0" />
            <div className="absolute top-1/2 left-1/2 ml-2 -translate-y-1/2">
                <span className="text-xs font-mono text-zinc-400 font-bold">1:1</span>
            </div>
        </div>
      )}
    </div>
  );
};

const Timeline: React.FC = () => {
  const { language } = useLanguage();
  const data = timelineData[language];

  return (
    <section id="experience" className="py-24 bg-zinc-50/50 dark:bg-[#080808]">
      <div className="container mx-auto px-6">
        <SectionHeading 
            title={language === 'pt' ? "Jornada Profissional" : "Professional Journey"} 
            subtitle={language === 'pt' ? "Pipeline de Carreira (ETL)" : "Career Pipeline (ETL)"}
        />

        <div className="flex justify-center mb-12">
            {/* SQL Select Statement Header */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm font-mono text-xs sm:text-sm overflow-x-auto max-w-full">
                <Terminal size={14} className="text-zinc-400 mr-2 flex-shrink-0" />
                
                <span className="text-purple-600 dark:text-purple-400 font-bold">SELECT</span>
                <span className="text-zinc-600 dark:text-zinc-300 font-bold">*</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">FROM</span>
                <span className="text-emerald-600 dark:text-emerald-500 font-semibold">professional_journey</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">ORDER BY</span>
                <span className="text-blue-600 dark:text-blue-400">date</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">DESC</span>
                
                {/* Cursor Blink Effect */}
                <span className="animate-pulse w-2 h-4 bg-zinc-400 block ml-1"></span>
            </div>
        </div>

        <div className="relative max-w-3xl mx-auto flex flex-col items-center">
          {data.map((item, index) => (
            <DatabaseTable 
              key={item.id} 
              item={item} 
              index={index} 
              isLast={index === data.length - 1} 
            />
          ))}
          
          {/* End of Stream */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mt-2"
          >
             <div className="h-8 w-px bg-dashed bg-zinc-300 dark:bg-zinc-700"></div>
             <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
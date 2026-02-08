'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AgileWorkflow = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500); 
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Search, title: t('common.step_1_title'), desc: t('common.step_1_desc') },
    { icon: PenTool, title: t('common.step_2_title'), desc: t('common.step_2_desc') },
    { icon: Code, title: t('common.step_3_title'), desc: t('common.step_3_desc') },
    { icon: Rocket, title: t('common.step_4_title'), desc: t('common.step_4_desc') }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0f172a] overflow-hidden relative transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
         <div className="mb-20 text-center md:text-left">
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-2 block">{t('common.workflow')}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">{t('common.methodology')} <span className="text-primary">{t('common.agile')}</span></h2>
            <p className="text-gray-500 mt-4 max-w-2xl">{t('common.agile_desc')}</p>
         </div>

         <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
               ></motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-0">
               {steps.map((step, idx) => {
                 const isActive = activeStep === idx;
                 return (
                   <div 
                      key={idx}
                      className="relative group lg:px-4 cursor-pointer"
                      onClick={() => setActiveStep(idx)}
                   >
                      {/* Icon Circle */}
                      <motion.div 
                        animate={{ 
                          scale: isActive ? 1.1 : 1,
                          borderColor: isActive ? 'var(--primary-color)' : 'transparent'
                        }}
                        className={`w-24 h-24 mx-auto lg:mx-0 bg-white dark:bg-[#151e32] border-4 rounded-full flex items-center justify-center relative z-10 shadow-xl transition-all duration-500 ${isActive ? 'border-primary' : 'border-gray-100 dark:border-[#1e293b]'}`}
                      >
                         <AnimatePresence>
                           {isActive && (
                             <motion.div 
                               initial={{ scale: 0, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               exit={{ scale: 0, opacity: 0 }}
                               className="absolute inset-0 bg-primary/10 rounded-full"
                             />
                           )}
                         </AnimatePresence>
                         <step.icon size={32} className={`transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                         
                         {/* Step Number Badge */}
                         <div className={`absolute top-0 right-0 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-accent text-dark border-white' : 'bg-gray-200 text-gray-500 border-white dark:border-[#151e32] dark:bg-white/10'}`}>
                            {idx + 1}
                         </div>
                      </motion.div>

                      {/* Content Card */}
                      <motion.div 
                        animate={{ 
                          y: isActive ? -10 : 0,
                          opacity: isActive ? 1 : 0.7
                        }}
                        className={`mt-8 p-6 rounded-2xl border transition-all text-center lg:text-left relative ${isActive ? 'bg-white dark:bg-white/10 border-primary/50 shadow-lg' : 'bg-slate-50 dark:bg-white/5 border-gray-100 dark:border-white/5 grayscale'}`}
                      >
                         {/* Connector Line (Mobile) */}
                         {idx < 3 && (
                            <div className="lg:hidden absolute bottom-[-32px] left-1/2 w-0.5 h-8 bg-gray-200 dark:bg-white/10 -translate-x-1/2"></div>
                         )}
                         <h3 className={`text-xl font-bold mb-3 ${isActive ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{step.title.split('. ')[1]}</h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                      </motion.div>
                   </div>
                 );
               })}
            </div>
         </div>
      </div>
    </section>
  );
};

export default AgileWorkflow;

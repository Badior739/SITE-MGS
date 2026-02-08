'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Atom, Server, Cloud, Database, Smartphone, Terminal, Box, Globe, Layers, Cpu, ShieldCheck, Wifi
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import AgileWorkflow from './AgileWorkflow';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const iconPop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
};

const ServicesSections = () => {
  const { t } = useLanguage();
  const MotionDiv = motion.div as any;

  return (
    <>
      <section className="py-24 bg-slate-900 dark:bg-[#0a0e17] text-white relative overflow-hidden transition-colors duration-500">
        <div className="container mx-auto px-6 relative z-10">
          <MotionDiv {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t('common.tech_dna')}</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('common.tech_desc')}</p>
          </MotionDiv>
          
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: Atom, label: "React", col: "text-cyan-400" }, { icon: Server, label: "Node.js", col: "text-green-500" },
              { icon: Cloud, label: "AWS", col: "text-orange-400" }, { icon: Database, label: "PostgreSQL", col: "text-blue-400" },
              { icon: Smartphone, label: "React Native", col: "text-purple-400" }, { icon: Terminal, label: "TypeScript", col: "text-blue-600" },
              { icon: Box, label: "Docker", col: "text-blue-500" }, { icon: Globe, label: "Next.js", col: "text-white" },
              { icon: Layers, label: "GraphQL", col: "text-pink-500" }, { icon: Cpu, label: "AI/ML", col: "text-emerald-400" },
              { icon: ShieldCheck, label: "CyberSec", col: "text-red-500" }, { icon: Wifi, label: "IoT", col: "text-yellow-400" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={iconPop} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-white/30 transition-all cursor-default group">
                <item.icon size={32} className={`${item.col} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-white">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <AgileWorkflow />
      <section className="py-24 bg-slate-100 dark:bg-[#0b1120] transition-colors duration-500">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-12 uppercase tracking-widest">{t('common.expertise')}</h2>
            <div className="flex flex-wrap justify-center gap-4">
               {["FinTech", "E-Commerce", "Santé", "Immobilier", "Éducation", "Logistique", "AgriTech"].map((tag, i) => (
                  <span key={i} className="px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-slate-700 dark:text-gray-300 font-bold hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default shadow-sm">
                     #{tag}
                  </span>
               ))}
            </div>
         </div>
      </section>
    </>
  );
};

export default ServicesSections;

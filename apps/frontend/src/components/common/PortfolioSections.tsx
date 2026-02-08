'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Figma, Image as ImageIcon, Box, Video, TrendingUp, Clock, Users, Award, Palette, Star
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const PortfolioSections = () => {
  const { t } = useLanguage();
  const MotionDiv = motion.div as any;

  return (
    <>
      <section className="py-24 bg-slate-900 dark:bg-[#1a1a2e] text-white overflow-hidden transition-colors duration-500">
         <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <MotionDiv {...fadeInUp}>
               <h2 className="text-4xl font-black mb-6">{t('common.creative_studio')}</h2>
               <p className="text-gray-400 text-lg mb-8">{t('common.creative_desc')}</p>
               <div className="flex flex-wrap gap-4">
                  {[
                     { n: "Figma", i: Figma, c: "text-purple-400" }, { n: "Adobe CC", i: ImageIcon, c: "text-red-500" },
                     { n: "Blender", i: Box, c: "text-orange-400" }, { n: "After Effects", i: Video, c: "text-indigo-400" }
                  ].map((tool, idx) => (
                     <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                        <tool.i size={18} className={tool.c} /> <span className="font-bold text-sm">{tool.n}</span>
                     </div>
                  ))}
               </div>
            </MotionDiv>
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 blur-[100px] opacity-20"></div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/10 transform translate-y-8 animate-pulse"></div>
                  <div className="h-40 bg-white/10 rounded-2xl border border-white/20"></div>
                  <div className="h-40 bg-white/10 rounded-2xl border border-white/20"></div>
                  <div className="h-40 bg-white/5 rounded-2xl border border-white/10 transform -translate-y-8 animate-pulse"></div>
               </div>
            </div>
         </div>
      </section>
      <section className="py-20 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
               {[
                  { icon: TrendingUp, val: "+150%", label: "Conversion Moyenne", c: "text-green-500" },
                  { icon: Clock, val: "-40%", label: "Temps de Chargement", c: "text-blue-500" },
                  { icon: Users, val: "2.5M+", label: "Utilisateurs Touchés", c: "text-purple-500" }
               ].map((stat, idx) => (
                  <MotionDiv key={idx} whileHover={{ scale: 1.05 }} className="p-8 rounded-3xl bg-slate-50 dark:bg-[#151e32] shadow-xl border border-gray-100 dark:border-white/5">
                     <stat.icon size={40} className={`mx-auto mb-4 ${stat.c}`} />
                     <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">{stat.val}</div>
                     <p className="text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
                  </MotionDiv>
               ))}
            </div>
         </div>
      </section>
      <section className="py-24 bg-[#050505] dark:bg-[#0a0f1c] relative overflow-hidden transition-colors duration-500">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <MotionDiv {...fadeInUp}>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('common.awards_title')}</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                     {t('common.awards_desc')}
                  </p>
               </MotionDiv>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { title: "Site of the Day", org: "Awwwards", date: "2024", icon: Award },
                  { title: "Best UI Design", org: "CSS Design Awards", date: "2023", icon: Palette },
                  { title: "Featured", org: "Behance", date: "2023", icon: Star },
                  { title: "Top Agency", org: "Clutch", date: "2022", icon: TrendingUp }
               ].map((award, idx) => (
                  <motion.div key={idx} whileHover={{ y: -10 }} className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                     <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-black mb-6 shadow-lg group-hover:scale-110 transition-transform">
                        <award.icon size={32} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
                     <p className="text-accent text-sm font-bold uppercase tracking-wider mb-4">{award.org}</p>
                     <div className="mt-auto pt-4 border-t border-white/5 w-full">
                        <span className="text-gray-500 text-sm font-mono">{award.date}</span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
    </>
  );
};

export default PortfolioSections;

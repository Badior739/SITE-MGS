'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Target, Github, FileText, Video, Coffee, GraduationCap, Plane, Heart, Globe, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const TeamSections = () => {
  const { t } = useLanguage();
  const MotionDiv = motion.div as any;

  return (
    <>
      <section className="py-24 bg-slate-50 dark:bg-[#0b1120] transition-colors duration-500">
         <div className="container mx-auto px-6 text-center">
            <MotionDiv {...fadeInUp} className="mb-12">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{t('common.tools_title')}</h2>
               <p className="text-gray-500">{t('common.tools_desc')}</p>
            </MotionDiv>
            <div className="flex flex-wrap justify-center gap-8">
               {[
                  { n: "Slack", i: MessageCircle, c: "bg-[#4A154B]" }, { n: "Jira", i: Target, c: "bg-[#0052CC]" },
                  { n: "Github", i: Github, c: "bg-[#333]" }, { n: "Notion", i: FileText, c: "bg-black" },
                  { n: "Zoom", i: Video, c: "bg-[#2D8CFF]" }
               ].map((tool, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center gap-3">
                     <div className={`w-16 h-16 ${tool.c} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                        <tool.i size={30} />
                     </div>
                     <span className="font-bold text-slate-700 dark:text-gray-300">{tool.n}</span>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
      <section className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
               { icon: Coffee, title: "Ambiance Cool", desc: "Café à volonté et hiérarchie plate." },
               { icon: GraduationCap, title: "Formation", desc: "Budget illimité pour les livres & cours." },
               { icon: Plane, title: "Retraites", desc: "Voyages d'équipe annuels." },
               { icon: Heart, title: "Santé", desc: "Mutuelle premium pour tous." }
            ].map((perk, idx) => (
               <MotionDiv key={idx} className="p-6 border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <perk.icon size={32} className="text-accent mb-4" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{perk.title}</h3>
                  <p className="text-sm text-gray-500">{perk.desc}</p>
               </MotionDiv>
            ))}
         </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white text-center">
         <div className="container mx-auto px-6">
            <Globe size={64} className="mx-auto mb-6 opacity-80" />
            <h2 className="text-4xl font-black mb-6">{t('common.global_vision')}</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
               {t('common.global_desc')}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-accent hover:text-dark transition-all">
               {t('common.join_movement')} <ArrowRight size={20} />
            </Link>
         </div>
      </section>
    </>
  );
};

export default TeamSections;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, Instagram, Facebook, MessageCircle, Mail, Phone, Sun, Clock, MapPin, ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const XLogo = ({ className, size = 24 }: { className?: string, size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const SOCIAL_NETWORKS = [
  { name: "LinkedIn", sub: "Réseau Pro", icon: Linkedin, href: "#", color: "#0077b5", shadow: "rgba(0,119,181,0.3)" },
  { name: "X (Twitter)", sub: "Actu Tech", icon: XLogo, href: "#", color: "#888888", shadow: "rgba(136,136,136,0.2)" },
  { name: "Instagram", sub: "Coulisses", icon: Instagram, href: "#", color: "#E1306C", shadow: "rgba(225,48,108,0.3)" },
  { name: "Facebook", sub: "Communauté", icon: Facebook, href: "#", color: "#1877F2", shadow: "rgba(24,119,242,0.3)" }
];

const ContactSections = () => {
  const { t } = useLanguage();
  const MotionDiv = motion.div as any;

  return (
    <>
      <section className="py-24 bg-slate-900 dark:bg-[#050505] text-white transition-colors duration-500">
         <div className="container mx-auto px-6">
            <MotionDiv {...fadeInUp} className="text-center mb-16">
               <h2 className="text-4xl font-black mb-4">{t('common.follow_us')}</h2>
               <p className="text-gray-400">{t('common.dont_miss')}</p>
            </MotionDiv>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {SOCIAL_NETWORKS.map((social, idx) => (
                  <motion.a 
                     key={idx}
                     href={social.href}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     whileHover={{ 
                        scale: 1.02,
                        borderColor: `${social.color}80`,
                        boxShadow: `0 0 30px ${social.shadow}`
                     }}
                     style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                     className="group relative bg-white/5 backdrop-blur-xl border p-8 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 overflow-hidden"
                  >
                     <div 
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ color: social.color }}
                     ></div>
                     <div 
                        className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg"
                        style={{ color: social.color }}
                     >
                        <social.icon size={32} className="group-hover:rotate-12 transition-transform duration-500" />
                     </div>
                     <div className="text-center relative z-10">
                        <span className="block font-black text-xl text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-gray-400 transition-all">
                           {social.name}
                        </span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                           {social.sub}
                        </span>
                     </div>
                     <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at center, ${social.color}, transparent 70%)` }}
                     ></div>
                  </motion.a>
               ))}
            </div>
         </div>
      </section>
      <section className="py-24 bg-white dark:bg-[#0f172a] transition-colors duration-500">
         <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center shrink-0">
                     <MessageCircle size={32} />
                  </div>
                  <div>
                     <h3 className="font-bold text-xl text-slate-900 dark:text-white">{t('common.support_chat')}</h3>
                     <p className="text-gray-500 mb-2">{t('common.instant_reply')}</p>
                     <button onClick={() => document.getElementById('chatbot-trigger')?.click()} className="text-green-600 font-bold hover:underline">{t('common.open_chat')}</button>
                  </div>
               </div>
               
               <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                     <Mail size={32} />
                  </div>
                  <div>
                     <h3 className="font-bold text-xl text-slate-900 dark:text-white">Email</h3>
                     <p className="text-gray-500 mb-2">{t('common.email_contact')}</p>
                     <a href="mailto:contact@mindgraphix.com" className="text-blue-600 font-bold hover:underline">{t('common.write_us')}</a>
                  </div>
               </div>

               <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 flex items-center gap-6">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                     <Phone size={32} />
                  </div>
                  <div>
                     <h3 className="font-bold text-xl text-slate-900 dark:text-white">Téléphone</h3>
                     <p className="text-gray-500 mb-2">{t('common.phone_contact')}</p>
                     <a href="tel:+22601511146" className="text-purple-600 font-bold hover:underline">+226 01 51 11 46</a>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="py-24 bg-slate-900 dark:bg-[#02040a] relative overflow-hidden transition-colors duration-500">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
         <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"></div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('common.hub_strategic')}</h2>
               <p className="text-gray-400 max-w-2xl mx-auto">{t('common.hub_desc')}</p>
            </div>

            <div className="flex justify-center">
               <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(94,53,177,0.3)] w-full max-w-md"
               >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Bobo-Dioulasso</h3>
                        <p className="text-primary text-xs font-bold uppercase tracking-widest">{t('common.headquarters')}</p>
                     </div>
                     <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all">
                        <Sun size={24} className="group-hover:animate-spin-slow" />
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-white transition-colors">
                        <Clock size={16} className="text-primary"/> 
                        <span>{t('common.open_hours')}</span>
                     </div>
                     <div className="flex items-center gap-3 text-gray-400 text-sm group-hover:text-white transition-colors">
                        <MapPin size={16} className="text-primary"/> 
                        <span>Secteur 4, Rue 9.15</span>
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-end items-center">
                     <ArrowRight size={20} className="text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
    </>
  );
};

export default ContactSections;

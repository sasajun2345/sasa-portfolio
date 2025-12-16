import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, PlayCircle, BookOpen, ArrowDown } from 'lucide-react';
import ThreeBackground from './components/ThreeBackground';
import Typewriter from './components/Typewriter';
import NavBar from './components/NavBar';
import Gallery from './components/Gallery';
import { getTypewriterPhrases, getTranslations } from './i18n';
import type { Lang } from './i18n';
import { SectionId } from './types';

function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = getTranslations(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Navigation */}
      <NavBar lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'zh' : 'en')} />

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id={SectionId.HOME} className="h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
          <div className="w-full max-w-5xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h2 className="text-sm md:text-lg font-mono text-gray-400 mb-2 tracking-widest uppercase">
                {t.heroHello}
              </h2>
              {/* Permanent Name Display */}
              <h1 className="text-8xl md:text-[10rem] font-black tracking-tighter uppercase leading-none mb-4 text-white">
                SaSa
              </h1>
              {/* Typewriter for Roles */}
              <div className="min-h-[60px] md:min-h-[80px] flex items-center">
                <span className="text-2xl md:text-4xl font-mono text-gray-400 mr-4">&gt;</span>
                <h3 className="text-2xl md:text-5xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
                  <Typewriter 
                    key={lang}
                    phrases={getTypewriterPhrases(lang)} 
                    typingSpeed={80} 
                    deletingSpeed={40}
                    pauseTime={1200}
                  />
                </h3>
              </div>
              <p className="max-w-xl text-gray-400 mt-8 text-lg leading-relaxed backdrop-blur-sm">
                {t.bridgingParagraph}
              </p>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono">{t.scrollLabel}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="w-4 h-4 text-gray-500" />
            </motion.div>
          </motion.div>
        </section>

        {/* About / Bio Section */}
        <section id={SectionId.ABOUT} className="py-24 bg-zinc-950/80 backdrop-blur-sm border-y border-white/5">
          <div className="container mx-auto px-6 max-w-4xl">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="text-center"
             >
               <h2 className="text-3xl md:text-5xl font-bold uppercase mb-12 tracking-tight">
                 {t.aboutTitle}
               </h2>
               <div className="space-y-8 text-gray-300 leading-relaxed text-xl max-w-3xl mx-auto">
                 <p>
                   {t.aboutP1}
                 </p>
                 <p>
                   {t.aboutP2}
                 </p>
                 <div className="pt-12 border-t border-white/10 mt-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                     <div className="md:text-right">
                       <h4 className="font-mono text-sm text-gray-500 uppercase mb-4">{t.techStackLabel}</h4>
                       <ul className="text-lg font-bold space-y-2">
                         <li>Unity / C#</li>
                         <li>Touch Designer</li>
                         <li>Vibe Coding</li>
                       </ul>
                     </div>
                     <div>
                        <h4 className="font-mono text-sm text-gray-500 uppercase mb-4">{t.disciplineLabel}</h4>
                        <ul className="text-lg font-bold space-y-2">
                          {t.disciplineItems.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>
          </div>
        </section>

        {/* Gallery Component */}
        <Gallery lang={lang} />

        {/* Contact Section */}
        <section id={SectionId.CONTACT} className="py-24 border-t border-white/10 bg-black relative">
           <div className="container mx-auto px-6 text-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
             >
               <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8">
                 {t.readyToPlay}
               </h2>
               <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-xl">
                 {t.contactParagraph}
               </p>
               
              <a 
                href="mailto:2218570024@qq.com"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t.connectWithSasa}
               </a>

              <div className="mt-20 flex justify-center gap-6">
                {[
                  { label: 'B站', url: 'https://space.bilibili.com/6776121' },
                  { label: '小红书', url: 'https://www.xiaohongshu.com/user/profile/633d583d000000001901c5d0' }
                ].map((social) => (
                  <a 
                    key={social.label} 
                    href={social.url}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-white/20 px-6 py-3 text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 hover:scale-105"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
             </motion.div>
           </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/5 bg-zinc-950 text-center">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center text-xs font-mono text-gray-600">
          <p>{getTranslations(lang).footerLine1(new Date().getFullYear())}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

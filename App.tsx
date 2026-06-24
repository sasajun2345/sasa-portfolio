import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowDown } from 'lucide-react';
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
    <div className="min-h-screen xp-bg text-y2k-text selection:bg-y2k-accent selection:text-y2k-white">
      {/* 3D Background */}
      <ThreeBackground />

      {/* Navigation */}
      <NavBar lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'zh' : 'en')} />

      <main className="relative z-10">

        {/* ─── Hero Section ─── */}
        <section id={SectionId.HOME} className="flex flex-col justify-center px-4 relative overflow-hidden">
          <div className="w-full max-w-4xl mx-auto relative z-10 pt-36 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Greeting — terminal style */}
              <div className="win95-panel inline-block px-3 py-1 mb-4">
                <p className="font-display text-lg text-y2k-text-dark">
                  <span className="text-y2k-accent">{'>'}</span> {t.heroHello}
                </p>
              </div>

              {/* Name — big pixel heading */}
              <h1 className="font-display text-6xl md:text-[7rem] text-y2k-heading tracking-wider leading-none mb-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
                SaSa
              </h1>

              {/* Typewriter Roles */}
              <div className="min-h-[40px] md:min-h-[56px] flex items-center mb-6">
                <span className="font-display text-xl md:text-2xl text-y2k-accent-light mr-2">{'>'}</span>
                <h3 className="font-display text-xl md:text-2xl text-y2k-heading">
                  <Typewriter
                    key={lang}
                    phrases={getTypewriterPhrases(lang)}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseTime={1200}
                  />
                </h3>
              </div>

              {/* Bridging Paragraph — inside a sunken panel */}
              <div className="win95-panel p-4 max-w-2xl" style={{ borderStyle: 'inset' }}>
                <p className="font-body text-sm md:text-base text-y2k-text-dark leading-relaxed">
                  {t.bridgingParagraph}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="font-pixel-tiny text-[8px] text-y2k-muted uppercase">
              {t.scrollLabel}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="w-4 h-4 text-y2k-accent-light" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── About / Bio Section ─── */}
        <section id={SectionId.ABOUT} className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Section Title — XP title bar */}
              <div className="xp-titlebar mb-6 flex items-center gap-2 rounded-sm">
                <span className="w-3 h-3 bg-y2k-highlight rounded-sm"></span>
                <h2 className="font-ui text-sm font-bold text-y2k-white tracking-wide">
                  {t.aboutTitle}
                </h2>
              </div>

              {/* Bio — window content area */}
              <div className="win95-panel p-4 mb-4">
                <div className="space-y-4 font-body text-sm md:text-base text-y2k-text-dark leading-relaxed">
                  <p>{t.aboutP1}</p>
                  <p>{t.aboutP2}</p>
                </div>
              </div>

              {/* Tags Row — pixel badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {t.aboutTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-display text-base text-y2k-white bg-y2k-accent px-3 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Closing Statement */}
              <div className="win95-panel p-3 mt-6">
                <p className="font-display text-xl md:text-2xl text-y2k-text-dark">
                  {t.aboutClosing}
                </p>
              </div>

              {/* Exhibitions */}
              <div className="mt-8">
                <div className="xp-titlebar mb-3 flex items-center gap-2 rounded-sm">
                  <span className="w-3 h-3 bg-y2k-highlight rounded-sm"></span>
                  <h4 className="font-ui text-sm font-bold text-y2k-white tracking-wide">
                    {t.exhibitionsLabel}
                  </h4>
                </div>
                <div className="win95-panel p-3 space-y-3">
                  {t.exhibitions.map((ex) => (
                    <div key={ex.time + ex.title} className="flex gap-3 items-baseline font-body text-sm">
                      <span className="font-display text-base text-y2k-accent whitespace-nowrap min-w-[64px]">
                        {ex.time}
                      </span>
                      <span className="font-ui text-xs text-y2k-muted whitespace-nowrap min-w-[40px] font-bold">
                        {ex.location}
                      </span>
                      <span className="text-y2k-text-dark leading-relaxed">
                        {ex.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Discipline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {/* Tools */}
                <div className="win95-panel p-4">
                  <h4 className="font-display text-sm text-y2k-accent mb-3">
                    {t.techStackLabel}
                  </h4>
                  <ul className="space-y-1">
                    {['Unity / C#', 'Touch Designer', 'Vibe Coding'].map((item) => (
                      <li key={item} className="font-ui text-sm font-bold text-y2k-text-dark">
                        {'> '}{item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Discipline */}
                <div className="win95-panel p-4">
                  <h4 className="font-display text-sm text-y2k-accent mb-3">
                    {t.disciplineLabel}
                  </h4>
                  <ul className="space-y-1">
                    {t.disciplineItems.map((item) => (
                      <li key={item} className="font-ui text-sm font-bold text-y2k-text-dark">
                        {'> '}{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Gallery ─── */}
        <Gallery lang={lang} />

        {/* ─── Contact Section ─── */}
        <section id={SectionId.CONTACT} className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Title bar */}
              <div className="xp-titlebar mb-6 inline-flex items-center gap-2 rounded-sm">
                <span className="w-3 h-3 bg-y2k-highlight rounded-sm"></span>
                <h2 className="font-ui text-sm font-bold text-y2k-white tracking-wide">
                  {t.readyToPlay}
                </h2>
              </div>

              <p className="font-body text-sm text-y2k-text max-w-xl mx-auto mb-8 leading-relaxed">
                {t.contactParagraph}
              </p>

              {/* Email CTA — Win95 button */}
              <a
                href="mailto:2218570024@qq.com"
                className="win95-btn inline-flex items-center gap-2 font-ui font-bold text-sm text-y2k-text-dark px-6 py-3 hover:bg-y2k-accent hover:text-white transition-colors rounded-sm"
              >
                <Mail className="w-4 h-4" />
                {t.connectWithSasa}
              </a>

              {/* Social Links */}
              <div className="mt-10 flex justify-center gap-2">
                {[
                  { label: 'B站', url: 'https://space.bilibili.com/6776121' },
                  { label: '小红书', url: 'https://www.xiaohongshu.com/user/profile/633d583d000000001901c5d0' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="win95-btn font-ui text-xs font-bold text-y2k-text-dark px-4 py-2 hover:bg-y2k-accent hover:text-white transition-colors rounded-sm"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer — XP taskbar style */}
      <footer className="bg-y2k-xp-taskbar border-t border-y2k-border-dark">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-center items-center gap-1">
          <p className="font-display text-[10px] text-y2k-muted">
            {getTranslations(lang).footerLine1(new Date().getFullYear())}
          </p>
          <span className="hidden md:inline font-display text-[10px] text-y2k-border">{' | '}</span>
          <p className="font-display text-[10px] text-y2k-muted">
            {getTranslations(lang).footerLine2}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

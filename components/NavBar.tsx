import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getNavItems } from '../i18n';
import type { Lang } from '../i18n';

interface Props {
  lang: Lang;
  onToggleLang: () => void;
}

const NavBar: React.FC<Props> = ({ lang, onToggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-y2k-xp-taskbar/90 backdrop-blur-sm border-b border-y2k-border-dark py-2'
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-2xl text-y2k-heading tracking-wider hover:text-y2k-accent-light transition-colors drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]"
        >
          [SaSa]
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {getNavItems(lang).map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="win95-btn font-display text-sm font-bold text-y2k-text-dark px-4 py-1.5 hover:bg-y2k-accent hover:text-white transition-colors rounded-sm"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={onToggleLang}
            className="win95-btn font-display text-xs font-bold text-y2k-muted px-3 py-1.5 hover:bg-y2k-accent hover:text-white transition-colors rounded-sm"
            aria-label="Toggle Language"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden win95-btn p-2 text-y2k-heading rounded-sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-y2k-xp-taskbar border-b border-y2k-border-dark p-4 flex flex-col gap-1 md:hidden">
          {getNavItems(lang).map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="win95-btn font-display text-sm font-bold text-y2k-heading px-4 py-2 hover:bg-y2k-accent hover:text-white transition-colors rounded-sm"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              onToggleLang();
              setMobileMenuOpen(false);
            }}
            className="win95-btn font-display text-sm font-bold text-y2k-muted px-4 py-2 self-start hover:bg-y2k-accent hover:text-white transition-colors rounded-sm"
          >
            {lang === 'en' ? '切换到中文' : 'Switch to EN'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

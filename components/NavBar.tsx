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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter uppercase font-mono border-2 border-white px-2 hover:bg-white hover:text-black transition-colors">
          SaSa
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {getNavItems(lang).map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium uppercase tracking-widest hover:text-gray-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
            </a>
          ))}
          <button
            onClick={onToggleLang}
            className="text-xs font-mono uppercase tracking-widest border border-white/30 px-3 py-1 hover:bg-white hover:text-black transition-colors"
            aria-label="Toggle Language"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden">
          {getNavItems(lang).map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-mono uppercase tracking-widest hover:pl-4 transition-all duration-300 border-l-2 border-transparent hover:border-white pl-2"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              onToggleLang();
              setMobileMenuOpen(false);
            }}
            className="text-sm font-mono uppercase tracking-widest border border-white/30 px-3 py-2"
          >
            {lang === 'en' ? '切换到中文' : 'Switch to EN'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

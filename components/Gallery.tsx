import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from '../i18n';
import type { Lang } from '../i18n';
import { SectionId } from '../types';
import type { Artwork } from '../types';
import { fetchArtworks } from '../services/artworksService';

interface Props {
  lang: Lang;
}

const Gallery: React.FC<Props> = ({ lang }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const t = getTranslations(lang);

  useEffect(() => {
    setArtworks([]);
    const loadArtworks = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 50));
      const data = await fetchArtworks(lang);
      setArtworks(data);
      setLoading(false);
    };

    loadArtworks();
  }, [lang]);

  return (
    <section id={SectionId.WORKS} className="py-12 md:py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header — XP title bar */}
        <div className="xp-titlebar mb-6 flex justify-between items-center rounded-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-y2k-highlight rounded-sm"></span>
            <h2 className="font-ui text-sm font-bold text-y2k-white tracking-wide">
              {t.selectedWorks}
            </h2>
          </div>
          <span className="font-display text-xs text-y2k-white/70">
            {t.indexLabel}
          </span>
        </div>

        {loading ? (
          <div className="win95-panel p-8 text-center rounded-sm">
            <p className="font-display text-xl text-y2k-text-dark">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworks.map((art, index) => {
              const hasLink = !!art.detailUrl;
              const cardContent = (
                <>
                  {/* Image Container — sunken panel */}
                  <div className="relative overflow-hidden bg-y2k-bg-dark aspect-video" style={{ border: '2px inset #808080' }}>
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover transition-all duration-300 filter contrast-100 group-hover:contrast-110 group-hover:brightness-105"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-y2k-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      {hasLink && (
                        <div className="win95-btn bg-y2k-white p-2 rounded-sm">
                          <ArrowUpRight className="w-5 h-5 text-y2k-text-dark" />
                        </div>
                      )}
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-2 right-2 bg-y2k-black text-y2k-highlight px-2 py-0.5 rounded-sm">
                      <span className="font-display text-sm">{art.year}</span>
                    </div>
                  </div>

                  {/* Text Info */}
                  <div className="mt-2 p-2">
                    <h3 className="font-display text-sm font-bold text-y2k-heading uppercase tracking-wide truncate">
                      {art.title}
                    </h3>
                    <p className="font-display text-[10px] text-y2k-accent-light uppercase tracking-wider mt-0.5">
                      {art.category}
                    </p>
                    <p className="font-body text-xs text-y2k-text leading-relaxed line-clamp-2 mt-1">
                      {art.description}
                    </p>
                  </div>
                </>
              );

              const commonProps = {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.4, delay: index * 0.06 },
                className: `group relative ${hasLink ? 'cursor-pointer' : 'cursor-default'}`,
                onMouseEnter: () => setHoveredId(art.id),
                onMouseLeave: () => setHoveredId(null)
              } as const;

              return hasLink ? (
                <motion.a
                  key={art.id}
                  {...commonProps}
                  href={art.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={art.title}
                >
                  {cardContent}
                </motion.a>
              ) : (
                <motion.div key={art.id} {...commonProps}>
                  {cardContent}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

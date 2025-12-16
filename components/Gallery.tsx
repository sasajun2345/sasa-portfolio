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

  // 加载作品数据
  useEffect(() => {
    // 每次语言变化时，先重置为空，再重新加载
    setArtworks([]);
    const loadArtworks = async () => {
      setLoading(true);
      // 增加小延迟以确保状态刷新
      await new Promise(r => setTimeout(r, 50));
      const data = await fetchArtworks(lang);
      setArtworks(data);
      setLoading(false);
    };

    loadArtworks();
  }, [lang]);

  return (
    <section id={SectionId.WORKS} className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16 border-b border-white/20 pb-4 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">{t.selectedWorks}</h2>
          <span className="hidden md:block font-mono text-xs text-gray-400">{t.indexLabel}</span>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading works...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((art, index) => {
              const hasLink = !!art.detailUrl;
              const commonProps = {
                initial: { opacity: 0, y: 50 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: index * 0.1 },
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
                {/* Stereo/3D border effect wrapper */}
                <div className="relative overflow-hidden border border-white/10 bg-zinc-900 aspect-video transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  
                  {/* Image */}
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                  />

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                     <div className="border border-white p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                       <ArrowUpRight className="w-8 h-8 text-white" />
                     </div>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 border border-white/20 text-xs font-mono">
                    {art.year}
                  </div>
                </div>

                {/* Text Info */}
                <div className="mt-4 border-l-2 border-transparent group-hover:border-white pl-0 group-hover:pl-3 transition-all duration-300 space-y-2">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight">{art.title}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1 uppercase">{art.category}</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {art.description}
                  </p>
                </div>
              </motion.a>
              ) : (
                <motion.div key={art.id} {...commonProps}>
                 {/* Stereo/3D border effect wrapper */}
                 <div className="relative overflow-hidden border border-white/10 bg-zinc-900 aspect-video transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  
                  {/* Image */}
                  <img 
                     src={art.imageUrl} 
                     alt={art.title} 
                     className="w-full h-full object-cover transition-all duration-700 filter grayscale group-hover:grayscale-0 group-hover:scale-110"
                   />

                   {/* Year Badge */}
                   <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2 py-1 border border-white/20 text-xs font-mono">
                     {art.year}
                   </div>
                 </div>

                 {/* Text Info */}
                 <div className="mt-4 border-l-2 border-transparent group-hover:border-white pl-0 group-hover:pl-3 transition-all duration-300 space-y-2">
                   <div>
                     <h3 className="text-xl font-bold uppercase tracking-tight">{art.title}</h3>
                     <p className="text-xs text-gray-400 font-mono mt-1 uppercase">{art.category}</p>
                   </div>
                   <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                     {art.description}
                   </p>
                 </div>
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

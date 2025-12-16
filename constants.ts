import { Artwork, SectionId } from './types';

export const ARTWORKS: Artwork[] = [
  {
    id: '1',
    title: 'Neon Cyberpunk',
    category: 'Environment Art',
    imageUrl: 'https://picsum.photos/800/800?random=10',
    year: '2024',
    description: 'A real-time rendered city block exploring verticality and neon aesthetics in Unity.'
  },
  {
    id: '2',
    title: 'Project: Aether',
    category: 'Game Prototype',
    imageUrl: 'https://picsum.photos/800/1200?random=22',
    year: '2024',
    description: 'Core mechanics and shader development for a zero-gravity exploration game.'
  },
  {
    id: '3',
    title: 'Glitch Soul',
    category: 'Interactive Media',
    imageUrl: 'https://picsum.photos/1200/800?random=33',
    year: '2023',
    description: 'Interactive installation using Kinect sensors to map movement to digital noise.'
  },
  {
    id: '4',
    title: 'Character 01',
    category: '3D Sculpt',
    imageUrl: 'https://picsum.photos/800/1000?random=44',
    year: '2023',
    description: 'High-poly character study focusing on futuristic armor and hard-surface modeling.'
  },
  {
    id: '5',
    title: 'Procedural Terrain',
    category: 'Tech Art',
    imageUrl: 'https://picsum.photos/900/900?random=55',
    year: '2024',
    description: 'GPU-instanced foliage and terrain generation system.'
  },
  {
    id: '6',
    title: 'Holo_UI',
    category: 'Game UI/UX',
    imageUrl: 'https://picsum.photos/800/600?random=66',
    year: '2023',
    description: 'Diegetic user interface designs for an unreleased sci-fi tactical shooter.'
  }
];

export const TYPEWRITER_PHRASES = [
  "Digital Media Artist",
  "Game Developer",
  "World Builder",
  "Tech Artist"
];

export const NAV_ITEMS = [
  { label: 'Works', href: `#${SectionId.WORKS}` },
  { label: 'About', href: `#${SectionId.ABOUT}` },
  { label: 'Contact', href: `#${SectionId.CONTACT}` },
];
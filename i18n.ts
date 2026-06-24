import { Artwork, NavItem } from './types'
import { SectionId } from './types'

export type Lang = 'en' | 'zh'

const en = {
  heroHello: 'Hello, I am',
  bridgingParagraph:
    'Telling social issues and the stories I want to tell through digital art.',
  scrollLabel: 'Scroll',
  aboutTitle: 'About',
  aboutP1:
    "Hi, I'm SaSa — a Unity developer, digital artist, and storyteller. I create interactive experiences at the intersection of fan culture, feminism, and experimental art.",
  aboutP2:
    'Most of my works are inspired by the fields I love — fan creations rooted in K-POP and ACG culture — and focus on social issues such as feminism and identity.',
  aboutTags: ['Fan Art', 'Digital Art', 'Feminism', 'Vibe Coding'],
  aboutClosing: 'This is the best version of me.',
  exhibitionsLabel: 'Exhibitions',
  exhibitions: [
    { time: '2024.01', location: 'Beijing', title: '"Love Without Worries" — Bloom Art & Yanyiquan Art Gallery' },
    { time: '2024.07', location: 'Suzhou', title: '"Being" — Global Contemporary Young Artists Joint Exhibition (Phase 1)' },
  ],
  techStackLabel: 'Tools',
  disciplineLabel: 'Discipline',
  disciplineItems: ['Game Development', 'Interactive Art', 'Tools & Extensions'],
  selectedWorks: 'Selected Works',
  indexLabel: 'INDEX 01 — 06',
  readyToPlay: "Let's Connect",
  contactParagraph:
    "Thank you for reading this far. I'm always open to collaborations and conversations.",
  connectWithSasa: 'Say Hello',
  artistBadge: 'ARTIST: SaSa',
  portraitAlt: 'SaSa Portrait',
  footerLine1: (year: number) => `© ${year} SaSa. All rights reserved.`,
  footerLine2: 'Digital Art & Storytelling',
  typewriterPhrases: ['DIGITAL ARTIST', 'GAME DEVELOPER', 'STORYTELLER'],
  navItems: [
    { label: 'Works', href: `#${SectionId.WORKS}` },
    { label: 'About', href: `#${SectionId.ABOUT}` },
    { label: 'Contact', href: `#${SectionId.CONTACT}` }
  ] as NavItem[],
  artworks: [
    {
      id: '1',
      title: 'Neon Cyberpunk',
      category: 'Environment Art',
      imageUrl: 'https://picsum.photos/800/800?random=10',
      year: '2024',
      description:
        'A real-time rendered city block exploring verticality and neon aesthetics in Unity.'
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
      description:
        'Interactive installation using Kinect sensors to map movement to digital noise.'
    },
    {
      id: '4',
      title: 'Character 01',
      category: '3D Sculpt',
      imageUrl: 'https://picsum.photos/800/1000?random=44',
      year: '2023',
      description:
        'High-poly character study focusing on futuristic armor and hard-surface modeling.'
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
      description:
        'Diegetic user interface designs for an unreleased sci-fi tactical shooter.'
    }
  ] as Artwork[]
}

const zh = {
  heroHello: '你好，我是',
  bridgingParagraph:
    '用数字艺术的方式，讲述一个个社会议题以及我想讲的故事。',
  scrollLabel: '向下滚动',
  aboutTitle: '关于',
  aboutP1:
    '嗨，我是 SaSa —— 一名 Unity 开发者、数字艺术家和讲故事的人。我在同人文化、女性主义和实验艺术的交汇处创造交互体验。',
  aboutP2:
    '我的大多数作品都源于我热爱的领域 —— 根植于 K-POP 和二次元的同人创作 —— 并关注女性主义与身份认同等社会议题。',
  aboutTags: ['同人', '数字艺术', '女性主义', 'Vibe Coding'],
  aboutClosing: '这里是最好的我。',
  exhibitionsLabel: '参展经历',
  exhibitions: [
    { time: '2024.01', location: '北京', title: '《爱无烦恼》 — Bloom Art & 衍艺圈艺术馆' },
    { time: '2024.07', location: '苏州', title: '"在"全球当代青年艺术家联展（第一期）' },
  ],
  techStackLabel: '工具',
  disciplineLabel: '方向',
  disciplineItems: ['游戏开发', '交互艺术', '工具拓展开发'],
  selectedWorks: '精选作品',
  indexLabel: '索引 01 — 06',
  readyToPlay: '联系我',
  contactParagraph:
    '感谢你看到这里。我始终对合作和对话保持开放。',
  connectWithSasa: '打个招呼',
  artistBadge: '艺术家：SaSa',
  portraitAlt: 'SaSa 肖像',
  footerLine1: (year: number) => `© ${year} SaSa。保留所有权利。`,
  footerLine2: '数字艺术与叙事',
  typewriterPhrases: ['数字艺术家', '游戏开发者', '讲故事的人'],
  navItems: [
    { label: '作品', href: `#${SectionId.WORKS}` },
    { label: '关于', href: `#${SectionId.ABOUT}` },
    { label: '联系', href: `#${SectionId.CONTACT}` }
  ] as NavItem[],
  artworks: [
    {
      id: '1',
      title: '霓虹赛博朋克',
      category: '场景艺术',
      imageUrl: 'https://picsum.photos/800/800?random=10',
      year: '2024',
      description:
        'Unity 中实时渲染的城市街区，探索垂直空间与霓虹美学。'
    },
    {
      id: '2',
      title: '项目：以太',
      category: '游戏原型',
      imageUrl: 'https://picsum.photos/800/1200?random=22',
      year: '2024',
      description: '零重力探索游戏的核心机制与着色器开发。'
    },
    {
      id: '3',
      title: '失真之魂',
      category: '交互媒体',
      imageUrl: 'https://picsum.photos/1200/800?random=33',
      year: '2023',
      description:
        '使用 Kinect 传感器将肢体动作映射为数字噪声的交互装置。'
    },
    {
      id: '4',
      title: '角色 01',
      category: '3D 雕刻',
      imageUrl: 'https://picsum.photos/800/1000?random=44',
      year: '2023',
      description:
        '聚焦未来装甲与硬表面建模的高模角色研究。'
    },
    {
      id: '5',
      title: '程序化地形',
      category: '技术美术',
      imageUrl: 'https://picsum.photos/900/900?random=55',
      year: '2024',
      description: 'GPU 实例化植被与地形生成系统。'
    },
    {
      id: '6',
      title: '全息界面',
      category: '游戏界面/体验',
      imageUrl: 'https://picsum.photos/800/600?random=66',
      year: '2023',
      description:
        '为一款尚未发布的科幻战术射击游戏设计的拟物化用户界面。'
    }
  ] as Artwork[]
}

export const getTranslations = (lang: Lang) => (lang === 'zh' ? zh : en)

export const getNavItems = (lang: Lang): NavItem[] => getTranslations(lang).navItems
export const getTypewriterPhrases = (lang: Lang): string[] => getTranslations(lang).typewriterPhrases
export const getArtworks = (lang: Lang): Artwork[] => getTranslations(lang).artworks

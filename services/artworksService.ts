import type { Artwork } from '../types';
import type { Lang } from '../i18n';

const BASE = import.meta.env.BASE_URL || '/';
const CONFIG_PATH = `${BASE}artworks/config.json`;

// 缓存机制
let cache: Record<Lang, Artwork[]> | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

/**
 * 从配置文件加载作品数据
 * @param lang 语言代码
 * @returns 作品数据数组
 */
export const fetchArtworks = async (lang: Lang): Promise<Artwork[]> => {
  try {
    // 检查缓存是否有效
    const now = Date.now();
    if (cache && cache[lang] && cache[lang].length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
      return cache[lang];
    }

    // 从配置文件加载数据
    const response = await fetch(`${CONFIG_PATH}?t=${Date.now()}`, {
      cache: 'no-store', // 禁用浏览器缓存
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch artworks: ${response.statusText}`);
    }

    const config = await response.json();
    const rawArtworks = config[lang] as Artwork[];

    const resolveImageUrl = (url: string): string => {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      if (url.startsWith('/')) return `${BASE}${url.replace(/^\//, '')}`;
      return `${BASE}artworks/images/${url}`;
    };
    const resolveDetailUrl = (url: string): string => {
      if (!url || url === '') return '';
      if (url === '#') return '';
      if (url.startsWith('http') || url.startsWith('mailto:')) return url;
      if (url.startsWith('/')) return `${BASE}${url.replace(/^\//, '')}`;
      return `${BASE}artworks/links/${url}`;
    };

    const artworks = (rawArtworks || []).map((a) => ({
      ...a,
      imageUrl: resolveImageUrl(a.imageUrl),
      detailUrl: resolveDetailUrl(a.detailUrl)
    }));

    // 更新缓存
    if (!cache) {
      cache = { en: [], zh: [] };
    }
    cache[lang] = artworks;
    lastFetchTime = now;

    return artworks;
  } catch (error) {
    console.error('Error fetching artworks:', error);
    // 如果加载失败，返回空数组，确保应用不会崩溃
    return [];
  }
};

/**
 * 强制刷新作品数据（不使用缓存）
 * @param lang 语言代码
 * @returns 作品数据数组
 */
export const refreshArtworks = async (lang: Lang): Promise<Artwork[]> => {
  // 清除缓存
  cache = null;
  lastFetchTime = 0;
  // 重新加载数据
  return fetchArtworks(lang);
};

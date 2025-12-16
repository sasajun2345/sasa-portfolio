export interface Artwork {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
  description?: string;
  detailUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum SectionId {
  HOME = 'home',
  WORKS = 'works',
  ABOUT = 'about',
  CONTACT = 'contact',
}
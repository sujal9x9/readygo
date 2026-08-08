'use client';

import { useEffect, useState } from 'react';
import type { Destination, FAQ, GalleryImage, TeamMember, Testimonial } from './data';
import {
  destinations as defaultDestinations,
  faqs as defaultFaqs,
  galleryImages as defaultGalleryImages,
  teamMembers as defaultTeamMembers,
  testimonials as defaultTestimonials,
} from './data';

type SheetRow = Record<string, string>;

export type CmsContactInfo = {
  brand?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  address?: string;
};

export type CmsSiteInfo = {
  brandName?: string;
  tagline?: string;
  heroHeadingLine1?: string;
  heroHeadingLine2?: string;
  heroHeadingLine3?: string;
  heroSubtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
};

type CmsData = {
  siteInfo: CmsSiteInfo | null;
  contactInfo: CmsContactInfo | null;
  packages: Destination[];
  featuredDestinations: Destination[];
  galleryImages: GalleryImage[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  teamMembers: TeamMember[];
};

const emptyCmsData: CmsData = {
  siteInfo: null,
  contactInfo: null,
  packages: [],
  featuredDestinations: [],
  galleryImages: [],
  testimonials: [],
  faqs: [],
  teamMembers: [],
};

let cachedData: CmsData | null = null;
let inFlightRequest: Promise<CmsData> | null = null;

function clean(value: unknown) {
  return String(value ?? '').trim();
}

function isActive(row: SheetRow) {
  const value = clean(row.is_active).toLowerCase();
  return value === '' || value === 'true' || value === 'yes' || value === '1';
}

function numberFrom(value: unknown, fallback = 0) {
  const parsed = Number(String(value ?? '').replace(/[^\d.]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function validImage(value: string, fallback: string) {
  const image = clean(value);
  if (!image || image.includes('placeholder')) return fallback;
  return image;
}

async function fetchRows(sheet: string): Promise<SheetRow[]> {
  const response = await fetch(`/api/sheet?sheet=${encodeURIComponent(sheet)}&cachebust=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${sheet}`);

  return response.json();
}

async function fetchRowsSafely(sheet: string): Promise<SheetRow[]> {
  try {
    return await fetchRows(sheet);
  } catch {
    return [];
  }
}

function mapPackages(rows: SheetRow[], fallbacks: Destination[]) {
  if (!fallbacks.length) return [];
  return rows.filter(isActive).map((row, index) => {
    const fallback = fallbacks[index % fallbacks.length];
    const name = clean(row.package_name) || fallback.name;
    return {
      ...fallback,
      id: numberFrom(row.id, index + 1),
      name,
      slug: slugify(name),
      duration: clean(row.duration) || fallback.duration,
      price: numberFrom(row.price, fallback.price),
      originalPrice: numberFrom(row.original_price, fallback.originalPrice),
      rating: numberFrom(row.rating, fallback.rating),
      reviews: numberFrom(row.reviews_count, fallback.reviews),
      description: clean(row.short_description) || fallback.description,
      image: validImage(row.image_url, fallback.image),
      category: (clean(row.category).toLowerCase() || fallback.category) as Destination['category'],
      featured: true,
    };
  });
}

function mapFeaturedDestinations(rows: SheetRow[], fallbacks: Destination[]) {
  if (!fallbacks.length) return [];
  return rows.filter(isActive).map((row, index) => {
    const fallback = fallbacks[index % fallbacks.length];
    const name = clean(row.title) || fallback.name;
    return {
      ...fallback,
      id: numberFrom(row.id, index + 1),
      name,
      slug: slugify(name),
      price: numberFrom(row.price, fallback.price),
      rating: numberFrom(row.rating, fallback.rating),
      image: validImage(row.image_url, fallback.image),
      description: clean(row.state) || fallback.description,
      featured: true,
    };
  });
}

function mapGallery(rows: SheetRow[], fallbacks: GalleryImage[]) {
  if (!fallbacks.length) return [];
  return rows.filter(isActive).map((row, index) => {
    const fallback = fallbacks[index % fallbacks.length];
    return {
      id: numberFrom(row.id, index + 1),
      src: validImage(row.image_url, fallback.src),
      alt: clean(row.alt_text) || fallback.alt,
      aspect: (clean(row.category).toLowerCase() || fallback.aspect) as GalleryImage['aspect'],
    };
  });
}

function mapReviews(rows: SheetRow[], fallbacks: Testimonial[]) {
  if (!fallbacks.length) return [];
  return rows.filter(isActive).map((row, index) => {
    const fallback = fallbacks[index % fallbacks.length];
    const name = clean(row.customer_name) || fallback.name;
    return {
      id: numberFrom(row.id, index + 1),
      name,
      avatar: clean(row.image_url) || name.charAt(0).toUpperCase(),
      trip: clean(row.city) || fallback.trip,
      rating: numberFrom(row.rating, fallback.rating),
      text: clean(row.review_text) || fallback.text,
      date: fallback.date,
    };
  });
}

function mapFaqs(rows: SheetRow[], fallbacks: FAQ[]) {
  if (!fallbacks.length) return [];
  return rows.filter(isActive).map((row, index) => {
    const fallback = fallbacks[index % fallbacks.length];
    return {
      id: numberFrom(row.id, index + 1),
      question: clean(row.question) || fallback.question,
      answer: clean(row.answer) || fallback.answer,
    };
  });
}

function mapTeam(rows: SheetRow[], fallbacks: TeamMember[]) {
  if (!fallbacks.length) return [];
  return rows.filter(isActive).map((row, index) => {
    const fallback = fallbacks[index % fallbacks.length];
    return {
      id: numberFrom(row.id, index + 1),
      name: clean(row.name) || fallback.name,
      role: clean(row.role) || fallback.role,
      description: clean(row.description) || fallback.description,
      image: validImage(row.image_url, fallback.image),
    };
  });
}

function mapSiteInfo(rows: SheetRow[]): CmsSiteInfo | null {
  const row = rows.find(isActive) || rows[0];
  if (!row) return null;
  return {
    brandName: clean(row.brand_name),
    tagline: clean(row.tagline),
    heroHeadingLine1: clean(row.hero_heading_line_1),
    heroHeadingLine2: clean(row.hero_heading_line_2),
    heroHeadingLine3: clean(row.hero_heading_line_3),
    heroSubtitle: clean(row.hero_subtitle),
    primaryButtonText: clean(row.primary_button_text),
    secondaryButtonText: clean(row.secondary_button_text),
  };
}

function mapContactInfo(rows: SheetRow[]): CmsContactInfo | null {
  const row = rows.find(isActive) || rows[0];
  if (!row) return null;
  return {
    phone: clean(row.phone),
    whatsapp: clean(row.whatsapp_number).replace(/[^\d]/g, ''),
    email: clean(row.email),
    instagram: clean(row.instagram_url),
    address: clean(row.address),
  };
}

async function loadCmsData(): Promise<CmsData> {
  const [siteInfo, packages, featured, gallery, reviews, faqRows, team, contact] = await Promise.all([
    fetchRowsSafely('Site_Info'),
    fetchRowsSafely('Packages'),
    fetchRowsSafely('Featured_Destinations'),
    fetchRowsSafely('Gallery'),
    fetchRowsSafely('Reviews'),
    fetchRowsSafely('FAQs'),
    fetchRowsSafely('Team'),
    fetchRowsSafely('Contact_Info'),
  ]);

  const packageData = mapPackages(packages, defaultDestinations);
  const featuredData = mapFeaturedDestinations(featured, defaultDestinations);

  return {
    siteInfo: mapSiteInfo(siteInfo),
    contactInfo: mapContactInfo(contact),
    packages: packageData,
    featuredDestinations: featuredData.length ? featuredData : packageData.filter((item) => item.featured),
    galleryImages: mapGallery(gallery, defaultGalleryImages),
    testimonials: mapReviews(reviews, defaultTestimonials),
    faqs: mapFaqs(faqRows, defaultFaqs),
    teamMembers: mapTeam(team, defaultTeamMembers),
  };
}

async function refreshCmsData() {
  inFlightRequest ||= loadCmsData().then((nextData) => {
    cachedData = nextData;
    return nextData;
  }).finally(() => {
    inFlightRequest = null;
  });

  return inFlightRequest;
}

export function useCmsData(_fallbacks: {
  destinations: Destination[];
  galleryImages?: GalleryImage[];
  testimonials?: Testimonial[];
  faqs?: FAQ[];
  teamMembers?: TeamMember[];
}) {
  const [data, setData] = useState<CmsData>(cachedData || emptyCmsData);

  useEffect(() => {
    let active = true;

    const update = () => {
      refreshCmsData().then((nextData) => {
        if (active) setData(nextData);
      });
    };

    update();
    window.addEventListener('focus', update);
    document.addEventListener('visibilitychange', update);
    const interval = window.setInterval(update, 1000);

    return () => {
      active = false;
      window.removeEventListener('focus', update);
      document.removeEventListener('visibilitychange', update);
      window.clearInterval(interval);
    };
  }, []);

  return data;
}

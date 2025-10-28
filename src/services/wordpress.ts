import { CATEGORY_SLUGS, WORDPRESS_BASE_URL, WORDPRESS_ENDPOINTS } from '../config/wordpress';

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressPost {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  better_featured_image?: {
    source_url: string;
  };
}

export interface MapLocation {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  excerpt?: string;
  address?: string;
  link?: string;
}

async function request<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(`${WORDPRESS_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Erro ao comunicar com o WordPress (${response.status}): ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

async function getCategoryIdBySlug(slug: string): Promise<number | undefined> {
  const categories = await request<WordPressCategory[]>(WORDPRESS_ENDPOINTS.categories, { slug });
  return categories.length ? categories[0].id : undefined;
}

export async function fetchPostsByCategorySlug(slug: string): Promise<WordPressPost[]> {
  const categoryId = await getCategoryIdBySlug(slug);
  if (!categoryId) {
    return [];
  }

  return request<WordPressPost[]>(WORDPRESS_ENDPOINTS.posts, {
    categories: categoryId,
    per_page: 10,
    _embed: 1
  });
}

interface WordPressLocationResponse {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  acf?: {
    latitude?: string;
    longitude?: string;
    endereco?: string;
  };
  meta?: Record<string, unknown>;
  link: string;
}

export async function fetchMapLocations(): Promise<MapLocation[]> {
  try {
    const entries = await request<WordPressLocationResponse[]>(WORDPRESS_ENDPOINTS.mapLocations, {
      per_page: 50
    });

    return entries
      .map((item) => {
        const latitude = parseFloat(item.acf?.latitude ?? '');
        const longitude = parseFloat(item.acf?.longitude ?? '');

        if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
          return undefined;
        }

        return {
          id: item.id,
          title: item.title.rendered,
          latitude,
          longitude,
          excerpt: item.excerpt?.rendered,
          address: item.acf?.endereco,
          link: item.link
        } as MapLocation;
      })
      .filter((location): location is MapLocation => Boolean(location));
  } catch (error) {
    console.warn('Não foi possível carregar os pontos do mapa:', error);
    return [];
  }
}

export async function fetchPromotions(): Promise<WordPressPost[]> {
  return fetchPostsByCategorySlug(CATEGORY_SLUGS.promotions);
}

export async function fetchNews(): Promise<WordPressPost[]> {
  return fetchPostsByCategorySlug(CATEGORY_SLUGS.news);
}

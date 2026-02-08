/**
 * ============================================================================
 * 📄 SERVICE PAGES - Frontend
 * ============================================================================
 * 
 * Gère les appels API pour les pages et le CMS:
 * - Créer une page
 * - Lister les pages
 * - Récupérer une page par slug ou ID
 * - Mettre à jour une page
 * - Publier une page
 * - Archiver une page
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { mockDB } from '../../../utils/mockDatabase';

/**
 * Interface pour une page
 */
export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'PASSWORD_PROTECTED';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogImage?: string;
  blocks?: any;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}

/**
 * Interface pour créer/modifier une page
 */
export interface CreatePageRequest {
  title: string;
  slug: string;
  description?: string;
  content: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED';
  visibility?: 'PUBLIC' | 'PRIVATE' | 'PASSWORD_PROTECTED';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  blocks?: any;
}

/**
 * Service des pages
 */
export const pageService = {
  /**
   * Créer une nouvelle page
   */
  async create(data: CreatePageRequest): Promise<Page> {
    try {
      const response = await apiClient.post<Page>(API_ENDPOINTS.PAGES.CREATE, data);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error);
    } catch (error) {
      console.warn('API Create Page failed, using mock', error);
      // Mock logic could be added here if needed
      throw error;
    }
  },

  /**
   * Lister toutes les pages
   */
  async list(query?: { status?: string; visibility?: string }): Promise<Page[]> {
    try {
      const params = new URLSearchParams(query as any).toString();
      const url = params ? `${API_ENDPOINTS.PAGES.LIST}?${params}` : API_ENDPOINTS.PAGES.LIST;
      const response = await apiClient.get<Page[]>(url);
      if (response.success && response.data) {
        return response.data;
      }
    } catch (error) {
       console.warn('API List Pages failed, returning empty', error);
    }
    return [];
  },

  /**
   * Récupérer une page par slug
   */
  async getBySlug(slug: string): Promise<Page> {
    try {
      const response = await apiClient.get<Page>(API_ENDPOINTS.PAGES.GET_BY_SLUG(slug));
      if (response.success && response.data) {
        return response.data;
      }
    } catch (error) {
      console.warn(`API Get Page by slug ${slug} failed, using mockDB fallback`, error);
      // Fallback pseudo-dynamic mapping from mockDB if useful
    }
    
    // Default fallback to keep it working
    throw new Error('Page non trouvée');
  },

  /**
   * Récupérer une page par ID
   */
  async getById(id: string): Promise<Page> {
    const response = await apiClient.get<Page>(API_ENDPOINTS.PAGES.GET(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Page non trouvée');
  },

  /**
   * Mettre à jour une page
   */
  async update(id: string, data: Partial<CreatePageRequest>): Promise<Page> {
    const response = await apiClient.put<Page>(API_ENDPOINTS.PAGES.UPDATE(id), data);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erreur lors de la mise à jour');
  },

  /**
   * Publier une page
   */
  async publish(id: string): Promise<Page> {
    const response = await apiClient.post<Page>(API_ENDPOINTS.PAGES.PUBLISH(id));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Erreur lors de la publication');
  },

  /**
   * Archiver une page
   */
  async archive(id: string): Promise<void> {
    const response = await apiClient.delete(API_ENDPOINTS.PAGES.DELETE(id));
    if (!response.success) {
      throw new Error(response.error || 'Erreur lors de l\'archivage');
    }
  },
};

export default pageService;

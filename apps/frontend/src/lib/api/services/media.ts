/**
 * ============================================================================
 * 🎬 SERVICE MÉDIAS - Frontend
 * ============================================================================
 * 
 * Gère les appels API pour les médias:
 * - Charger un fichier
 * - Lister les médias
 * - Rechercher les médias
 * - Récupérer les détails d'un média
 * - Mettre à jour les métadonnées
 * - Supprimer un média
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

/**
 * Types de médias supportés
 */
export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO';

/**
 * Interface pour un média
 */
export interface Media {
  id: string;
  name: string;
  type: MediaType;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  tags: string[];
  description?: string;
  altText?: string;
  createdAt: string;
}

/**
 * Interface pour créer/modifier un média
 */
export interface CreateMediaRequest {
  name: string;
  type: MediaType;
  tags?: string[];
  description?: string;
  altText?: string;
}

/**
 * Service des médias
 */
export const mediaService = {
  /**
   * Charger un fichier média
   */
  async upload(file: File, data: Partial<CreateMediaRequest> = {}): Promise<Media> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', data.name || file.name);
    formData.append('type', data.type || detectMediaType(file.type));
    
    if (data.description) formData.append('description', data.description);
    if (data.altText) formData.append('altText', data.altText);
    if (data.tags) formData.append('tags', JSON.stringify(data.tags));

    const response = await apiClient.post<Media>(
      API_ENDPOINTS.MEDIA.CREATE,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Erreur lors du chargement du fichier');
  },

  /**
   * Lister les médias
   */
  async list(query?: { type?: MediaType; tags?: string[] }): Promise<Media[]> {
    const params = new URLSearchParams();
    if (query?.type) params.append('type', query.type);
    if (query?.tags) params.append('tags', query.tags.join(','));

    const url = params.toString() ? `${API_ENDPOINTS.MEDIA.LIST}?${params}` : API_ENDPOINTS.MEDIA.LIST;

    const response = await apiClient.get<Media[]>(url);

    if (response.success && response.data) {
      return response.data;
    }

    return [];
  },

  /**
   * Rechercher les médias
   */
  async search(query: string): Promise<Media[]> {
    const params = new URLSearchParams({ query });
    const response = await apiClient.get<Media[]>(`${API_ENDPOINTS.MEDIA.SEARCH}?${params}`);

    if (response.success && response.data) {
      return response.data;
    }

    return [];
  },

  /**
   * Récupérer un média par ID
   */
  async getById(id: string): Promise<Media> {
    const response = await apiClient.get<Media>(API_ENDPOINTS.MEDIA.GET(id));

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Média non trouvé');
  },

  /**
   * Mettre à jour les métadonnées d'un média
   */
  async update(id: string, data: Partial<CreateMediaRequest>): Promise<Media> {
    const response = await apiClient.put<Media>(API_ENDPOINTS.MEDIA.UPDATE(id), data);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Erreur lors de la mise à jour');
  },

  /**
   * Supprimer un média
   */
  async delete(id: string): Promise<void> {
    const response = await apiClient.delete(API_ENDPOINTS.MEDIA.DELETE(id));

    if (!response.success) {
      throw new Error(response.error || 'Erreur lors de la suppression');
    }
  },
};

/**
 * Détecter le type de média basé sur le type MIME
 */
function detectMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType.startsWith('video/')) return 'VIDEO';
  if (mimeType.startsWith('audio/')) return 'AUDIO';
  return 'DOCUMENT';
}

export default mediaService;

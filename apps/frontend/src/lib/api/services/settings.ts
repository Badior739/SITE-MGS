/**
 * ============================================================================
 * ⚙️  SERVICE PARAMÈTRES - Frontend
 * ============================================================================
 * 
 * Gère les appels API pour les paramètres du site:
 * - Récupérer la configuration du site
 * - Mettre à jour la configuration
 * - Récupérer les paramètres publics
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

/**
 * Interface pour la configuration du site
 */
export interface SiteConfig {
  id: string;
  siteName: string;
  siteDescription?: string;
  favicon?: string;
  logo?: string;
  supportEmail?: string;
  supportPhone?: string;
  socialLinks?: Record<string, string>;
  supportedLanguages: string[];
  defaultLanguage: string;
  enableComments: boolean;
  enableSearch: boolean;
  enableAnalytics: boolean;
  enableNewsletter: boolean;
  siteUrl: string;
  updatedAt: string;
}

/**
 * Interface pour mettre à jour la configuration
 */
export interface UpdateSiteConfigRequest {
  siteName?: string;
  siteDescription?: string;
  favicon?: string;
  logo?: string;
  supportEmail?: string;
  supportPhone?: string;
  socialLinks?: Record<string, string>;
  enableComments?: boolean;
  enableSearch?: boolean;
  enableAnalytics?: boolean;
  enableNewsletter?: boolean;
}

/**
 * Service des paramètres
 */
export const settingsService = {
  /**
   * Récupérer la configuration du site
   */
  async getSiteConfig(): Promise<SiteConfig> {
    const response = await apiClient.get<SiteConfig>(API_ENDPOINTS.SETTINGS.GET_SITE_CONFIG);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Erreur lors de la récupération de la configuration');
  },

  /**
   * Mettre à jour la configuration du site
   * (Accessible uniquement aux administrateurs)
   */
  async updateSiteConfig(data: UpdateSiteConfigRequest): Promise<SiteConfig> {
    const response = await apiClient.put<SiteConfig>(
      API_ENDPOINTS.SETTINGS.UPDATE_SITE_CONFIG,
      data,
    );

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Erreur lors de la mise à jour de la configuration');
  },

  /**
   * Récupérer les paramètres publics uniquement
   */
  async getPublicSettings(): Promise<Record<string, any>> {
    const response = await apiClient.get<Record<string, any>>(API_ENDPOINTS.SETTINGS.GET_PUBLIC);

    if (response.success && response.data) {
      return response.data;
    }

    return {};
  },
};

export default settingsService;

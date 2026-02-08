/**
 * ============================================================================
 * 🔐 SERVICE D'AUTHENTIFICATION - Frontend
 * ============================================================================
 * 
 * Gère les appels API d'authentification:
 * - Enregistrement
 * - Connexion
 * - Déconnexion
 * - Rafraîchissement du token
 * 
 * @author Mind Graphix Premium
 * @version 1.0.0
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { mockDB } from '../../../utils/mockDatabase';

/**
 * Interface pour les données d'enregistrement
 */
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/**
 * Interface pour les données de connexion
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Interface pour la réponse d'authentification
 */
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken?: string;
}

/**
 * Service d'authentification
 */
export const authService = {
  /**
   * Enregistrer un nouvel utilisateur
   */
  async register(data: RegisterRequest): Promise<AuthResponse | null> {
    try {
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
      
      if (response.success && response.data) {
        apiClient.setAuthentication(response.data.accessToken, response.data.refreshToken);
        return response.data;
      }
      throw new Error(response.error);
    } catch (error) {
      console.warn('API Register failed, using mock fallback', error);
      // Fallback Mock
      const mockUser = {
        id: 'usr_' + Date.now(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'EDITOR'
      };
      const result = { user: mockUser, accessToken: 'mock_access_token', refreshToken: 'mock_refresh_token' };
      apiClient.setAuthentication(result.accessToken, result.refreshToken);
      return result;
    }
  },

  /**
   * Se connecter avec email et mot de passe
   */
  async login(data: LoginRequest): Promise<AuthResponse | null> {
    try {
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
      
      if (response.success && response.data) {
        apiClient.setAuthentication(response.data.accessToken, response.data.refreshToken);
        return response.data;
      }
      throw new Error(response.error);
    } catch (error) {
      console.warn('API Login failed, using mock fallback', error);
      
      // Fallback Mock logic matching existing AdminContext
      if (data.email.toLowerCase() === 'admin@mindgraphix.com' && data.password === 'Admin@12345') {
        const result = {
          user: {
            id: 'usr_1',
            email: 'admin@mindgraphix.com',
            firstName: 'Super',
            lastName: 'Admin',
            role: 'SUPER_ADMIN'
          },
          accessToken: 'mock_access_token',
          refreshToken: 'mock_refresh_token'
        };
        apiClient.setAuthentication(result.accessToken, result.refreshToken);
        return result;
      }
      throw new Error('Identifiants invalides');
    }
  },

  /**
   * Se déconnecter
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (e) {}
    apiClient.clearAuthentication();
  },

  /**
   * Rafraîchir le token d'accès
   */
  async refresh(): Promise<{ accessToken: string } | null> {
    try {
      const response = await apiClient.post<{ accessToken: string }>(API_ENDPOINTS.AUTH.REFRESH);
      if (response.success && response.data) {
        apiClient.setAuthentication(response.data.accessToken);
        return response.data;
      }
    } catch (e) {}
    return { accessToken: 'mock_access_token' };
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return apiClient.isAuthenticated();
  },
};

export default authService;

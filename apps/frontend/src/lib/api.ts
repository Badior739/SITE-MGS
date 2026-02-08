// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  body?: any;
}

export async function apiCall(endpoint: string, options: RequestOptions = {}) {
  const { body, ...init } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiCall('/auth/login', { method: 'POST', body: { email, password } }),

  logout: () =>
    apiCall('/auth/logout', { method: 'POST' }),

  getCurrentUser: () =>
    apiCall('/auth/me', { method: 'GET' }),

  // Pages/CMS
  getPages: () =>
    apiCall('/pages', { method: 'GET' }),

  getPage: (id: string) =>
    apiCall(`/pages/${id}`, { method: 'GET' }),

  createPage: (data: any) =>
    apiCall('/pages', { method: 'POST', body: data }),

  updatePage: (id: string, data: any) =>
    apiCall(`/pages/${id}`, { method: 'PUT', body: data }),

  deletePage: (id: string) =>
    apiCall(`/pages/${id}`, { method: 'DELETE' }),

  // Settings
  getSettings: () =>
    apiCall('/settings', { method: 'GET' }),

  updateSettings: (data: any) =>
    apiCall('/settings', { method: 'PUT', body: data }),

  // Media/Files
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      body: formData,
    }).then(r => r.json());
  },

  // Users
  getUsers: () =>
    apiCall('/users', { method: 'GET' }),

  createUser: (data: any) =>
    apiCall('/users', { method: 'POST', body: data }),

  updateUser: (id: string, data: any) =>
    apiCall(`/users/${id}`, { method: 'PUT', body: data }),

  deleteUser: (id: string) =>
    apiCall(`/users/${id}`, { method: 'DELETE' }),
};

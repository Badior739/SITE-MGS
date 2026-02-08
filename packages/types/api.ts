// Shared API types
export interface AuthResponse {
  user: UserDto;
  tokens: TokenResponse;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export interface PageDto {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: PageStatus;
  visibility: PageVisibility;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum PageStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  SCHEDULED = 'SCHEDULED',
}

export enum PageVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  PASSWORD_PROTECTED = 'PASSWORD_PROTECTED',
}

export interface CreatePageDto {
  title: string;
  slug: string;
  description?: string;
  content: string;
}

export interface UpdatePageDto {
  title?: string;
  description?: string;
  content?: string;
  status?: PageStatus;
  visibility?: PageVisibility;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

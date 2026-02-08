import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Setting, SiteConfig } from '@prisma/client';

export interface UpdateSettingDto {
  value: string;
}

export interface UpdateSiteConfigDto {
  siteName?: string;
  siteDescription?: string;
  favicon?: string;
  logo?: string;
  supportEmail?: string;
  supportPhone?: string;
  siteUrl?: string;
  socialLinks?: any;
  enableComments?: boolean;
  enableSearch?: boolean;
  enableAnalytics?: boolean;
  enableNewsletter?: boolean;
}

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSetting(key: string): Promise<Setting | null> {
    return this.prisma.setting.findUnique({
      where: { key },
    });
  }

  async updateSetting(key: string, dto: UpdateSettingDto): Promise<Setting> {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value: dto.value },
      create: { key, value: dto.value },
    });
  }

  async getAllSettings(): Promise<Setting[]> {
    return this.prisma.setting.findMany({
      where: { isPublic: true },
      orderBy: { key: 'asc' },
    });
  }

  async getSiteConfig(): Promise<SiteConfig> {
    const config = await this.prisma.siteConfig.findUnique({
      where: { id: 'default' },
    });

    if (!config) {
      // Create default config
      return this.prisma.siteConfig.create({
        data: {
          id: 'default',
          siteName: 'Mind Graphix',
          siteUrl: process.env.SITE_URL || 'http://localhost:3000',
        },
      });
    }

    return config;
  }

  async updateSiteConfig(dto: UpdateSiteConfigDto): Promise<SiteConfig> {
    return this.prisma.siteConfig.upsert({
      where: { id: 'default' },
      update: dto,
      create: {
        id: 'default',
        siteName: dto.siteName || 'Mind Graphix',
        siteUrl: dto.siteUrl || process.env.SITE_URL || 'http://localhost:3000',
        ...dto,
      },
    });
  }
}

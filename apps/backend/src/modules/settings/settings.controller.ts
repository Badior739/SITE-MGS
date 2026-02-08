import { Controller, Get, Put, Body, UseGuards, Version } from '@nestjs/common';
import { SettingsService, UpdateSiteConfigDto } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Version('1')
  @Get('site-config')
  async getSiteConfig() {
    return this.settingsService.getSiteConfig();
  }

  @Version('1')
  @Put('site-config')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  async updateSiteConfig(@Body() dto: UpdateSiteConfigDto) {
    return this.settingsService.updateSiteConfig(dto);
  }

  @Version('1')
  @Get('public')
  async getPublicSettings() {
    return this.settingsService.getAllSettings();
  }
}

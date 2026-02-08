import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IntegrationType } from '@prisma/client';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dtos';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  // ========================================================================
  // INTEGRATION MANAGEMENT
  // ========================================================================

  async create(dto: CreateIntegrationDto) {
    const existingIntegration = await this.prisma.integration.findUnique({
      where: { name: dto.name },
    });

    if (existingIntegration) {
      throw new BadRequestException(`Integration '${dto.name}' already exists`);
    }

    return this.prisma.integration.create({
      data: dto,
    });
  }

  async findAll(filter?: { type?: IntegrationType; isActive?: boolean }) {
    return this.prisma.integration.findMany({
      where: {
        ...(filter?.type && { type: filter.type }),
        ...(filter?.isActive !== undefined && { isActive: filter.isActive }),
      },
    });
  }

  async findOne(id: string) {
    const integration = await this.prisma.integration.findUnique({
      where: { id },
    });

    if (!integration) {
      throw new NotFoundException(`Integration with ID '${id}' not found`);
    }

    return integration;
  }

  async findByName(name: string) {
    const integration = await this.prisma.integration.findUnique({
      where: { name },
    });

    if (!integration) {
      throw new NotFoundException(`Integration '${name}' not found`);
    }

    return integration;
  }

  async update(id: string, dto: UpdateIntegrationDto) {
    const integration = await this.findOne(id);

    return this.prisma.integration.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.findOne(id);

    return this.prisma.integration.delete({
      where: { id },
    });
  }

  // ========================================================================
  // ACTIVATION & STATUS
  // ========================================================================

  async activate(id: string) {
    const integration = await this.findOne(id);

    if (!integration.apiKey || !integration.apiSecret) {
      throw new BadRequestException(
        'API credentials are required before activation',
      );
    }

    return this.prisma.integration.update({
      where: { id },
      data: { isActive: true },
    });
  }

  async deactivate(id: string) {
    await this.findOne(id);

    return this.prisma.integration.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async getStatus(id: string) {
    const integration = await this.findOne(id);

    return {
      id: integration.id,
      name: integration.name,
      type: integration.type,
      isActive: integration.isActive,
      lastSyncAt: integration.lastSyncAt,
      syncError: integration.syncError,
    };
  }

  // ========================================================================
  // WEBHOOK MANAGEMENT
  // ========================================================================

  async registerWebhook(
    integrationId: string,
    webhookUrl: string,
    webhookSecret: string,
  ) {
    await this.findOne(integrationId);

    return this.prisma.integration.update({
      where: { id: integrationId },
      data: {
        webhookUrl,
        webhookSecret,
      },
    });
  }

  async removeWebhook(integrationId: string) {
    await this.findOne(integrationId);

    return this.prisma.integration.update({
      where: { id: integrationId },
      data: {
        webhookUrl: null,
        webhookSecret: null,
      },
    });
  }

  // ========================================================================
  // LOGGING
  // ========================================================================

  async logAction(
    integrationId: string,
    action: string,
    status: 'success' | 'failed' | 'pending',
    payload?: any,
    error?: string,
  ) {
    await this.findOne(integrationId);

    const log = await this.prisma.integrationLog.create({
      data: {
        integrationId,
        action,
        status,
        payload: payload || null,
        error: error || null,
      },
    });

    // Update integration sync timestamp on success
    if (status === 'success') {
      await this.prisma.integration.update({
        where: { id: integrationId },
        data: {
          lastSyncAt: new Date(),
          syncError: null,
        },
      });
    } else if (status === 'failed') {
      await this.prisma.integration.update({
        where: { id: integrationId },
        data: {
          syncError: error || 'Unknown error',
        },
      });
    }

    return log;
  }

  async getActionLogs(integrationId: string, limit: number = 50) {
    await this.findOne(integrationId);

    return this.prisma.integrationLog.findMany({
      where: { integrationId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // ========================================================================
  // INTEGRATION PROVIDERS (Stripe, HubSpot, Mailchimp, etc.)
  // ========================================================================

  async syncWithStripe(integrationId: string) {
    try {
      const integration = await this.findOne(integrationId);

      if (integration.name !== 'stripe') {
        throw new BadRequestException('This method is for Stripe only');
      }

      // TODO: Implement actual Stripe sync logic
      await this.logAction(
        integrationId,
        'sync',
        'success',
        { syncedAt: new Date() },
      );

      return { success: true, message: 'Stripe sync completed' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logAction(
        integrationId,
        'sync',
        'failed',
        null,
        errorMessage,
      );
      throw error;
    }
  }

  async syncWithHubSpot(integrationId: string) {
    try {
      const integration = await this.findOne(integrationId);

      if (integration.name !== 'hubspot') {
        throw new BadRequestException('This method is for HubSpot only');
      }

      // TODO: Implémenter la logique de sync réelle avec HubSpot
      await this.logAction(
        integrationId,
        'sync',
        'success',
        { syncedAt: new Date() },
      );

      return { success: true, message: 'HubSpot sync completed' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logAction(
        integrationId,
        'sync',
        'failed',
        null,
        errorMessage,
      );
      throw error;
    }
  }

  async syncWithMailchimp(integrationId: string) {
    try {
      const integration = await this.findOne(integrationId);

      if (integration.name !== 'mailchimp') {
        throw new BadRequestException('This method is for Mailchimp only');
      }

      // TODO: Implémenter la logique de sync réelle avec Mailchimp
      await this.logAction(
        integrationId,
        'sync',
        'success',
        { syncedAt: new Date() },
      );

      return { success: true, message: 'Mailchimp sync completed' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await this.logAction(
        integrationId,
        'sync',
        'failed',
        null,
        errorMessage,
      );
      throw error;
    }
  }
}

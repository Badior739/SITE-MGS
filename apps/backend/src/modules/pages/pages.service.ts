import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Page, PageStatus } from '@prisma/client';

export interface CreatePageDto {
  title: string;
  slug: string;
  description?: string;
  content: string;
  status?: PageStatus;
  blocks?: any;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface UpdatePageDto {
  title?: string;
  description?: string;
  content?: string;
  status?: PageStatus;
  blocks?: any;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePageDto, userId: string): Promise<Page> {
    // Check if slug already exists
    const existingPage = await this.prisma.page.findUnique({
      where: { slug: dto.slug },
    });

    if (existingPage) {
      throw new BadRequestException(`Page with slug "${dto.slug}" already exists`);
    }

    return this.prisma.page.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        content: dto.content,
        status: dto.status || PageStatus.DRAFT,
        blocks: dto.blocks,
        metaTitle: dto.metaTitle || dto.title,
        metaDescription: dto.metaDescription,
        metaKeywords: dto.metaKeywords,
        createdBy: userId,
      },
    });
  }

  async findAll(skip = 0, take = 10): Promise<Page[]> {
    return this.prisma.page.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Page> {
    const page = await this.prisma.page.findUnique({
      where: { slug },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    if (!page) {
      throw new NotFoundException(`Page with slug "${slug}" not found`);
    }

    // Increment view count
    await this.prisma.page.update({
      where: { id: page.id },
      data: { viewCount: { increment: 1 } },
    });

    return page;
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.prisma.page.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        versions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!page) {
      throw new NotFoundException(`Page with ID ${id} not found`);
    }

    return page;
  }

  async update(id: string, dto: UpdatePageDto, userId: string): Promise<Page> {
    await this.findOne(id);

    // Create version history before updating
    const currentPage = await this.prisma.page.findUnique({
      where: { id },
      select: { title: true, content: true, blocks: true },
    });

    const latestVersion = await this.prisma.pageVersion.findFirst({
      where: { pageId: id },
      orderBy: { versionNumber: 'desc' },
    });

    const nextVersionNumber = (latestVersion?.versionNumber || 0) + 1;

    await this.prisma.pageVersion.create({
      data: {
        pageId: id,
        title: currentPage!.title,
        content: currentPage!.content,
        blocks: currentPage!.blocks ? (currentPage!.blocks as any) : null,
        versionNumber: nextVersionNumber,
        createdBy: userId,
      },
    });

    // Update page
    return this.prisma.page.update({
      where: { id },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async delete(id: string): Promise<Page> {
    await this.findOne(id);

    return this.prisma.page.update({
      where: { id },
      data: { status: PageStatus.ARCHIVED },
    });
  }

  async publish(id: string, userId: string): Promise<Page> {
    await this.findOne(id);

    return this.prisma.page.update({
      where: { id },
      data: {
        status: PageStatus.PUBLISHED,
        publishedAt: new Date(),
        publishedBy: userId,
      },
    });
  }
}

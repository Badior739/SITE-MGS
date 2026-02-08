import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Media, MediaType } from '@prisma/client';

export interface CreateMediaDto {
  name: string;
  type: MediaType;
  mimeType: string;
  url: string;
  thumbnailUrl?: string;
  bucket: string;
  key: string;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  tags?: string[];
  description?: string;
  altText?: string;
}

export interface UpdateMediaDto {
  name?: string;
  description?: string;
  altText?: string;
  tags?: string[];
}

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMediaDto, userId: string): Promise<Media> {
    return this.prisma.media.create({
      data: {
        name: dto.name,
        type: dto.type,
        mimeType: dto.mimeType,
        url: dto.url,
        thumbnailUrl: dto.thumbnailUrl,
        bucket: dto.bucket,
        key: dto.key,
        size: dto.size,
        width: dto.width,
        height: dto.height,
        duration: dto.duration,
        tags: dto.tags || [],
        description: dto.description,
        altText: dto.altText,
        uploadedBy: userId,
      },
    });
  }

  async findAll(skip = 0, take = 10, type?: MediaType): Promise<Media[]> {
    return this.prisma.media.findMany({
      skip,
      take,
      where: type ? { type } : {},
      orderBy: { createdAt: 'desc' },
      include: {
        uploader: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.prisma.media.findUnique({
      where: { id },
      include: {
        uploader: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }

    return media;
  }

  async update(id: string, dto: UpdateMediaDto): Promise<Media> {
    await this.findOne(id);

    return this.prisma.media.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        altText: dto.altText,
        tags: dto.tags,
      },
    });
  }

  async delete(id: string): Promise<Media> {
    await this.findOne(id);

    return this.prisma.media.delete({
      where: { id },
    });
  }

  async search(query: string, take = 10): Promise<Media[]> {
    return this.prisma.media.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { hasSome: [query] } },
        ],
      },
      take,
      orderBy: { createdAt: 'desc' },
    });
  }
}

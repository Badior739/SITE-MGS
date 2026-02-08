import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req, Version, ParseEnumPipe } from '@nestjs/common';
import { MediaService, CreateMediaDto, UpdateMediaDto } from './media.service';
import { MediaType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Version('1')
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  async create(@Body() createMediaDto: CreateMediaDto, @Req() req: any) {
    return this.mediaService.create(createMediaDto, req.user.sub);
  }

  @Version('1')
  @Get()
  async findAll(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('type') type?: MediaType,
  ) {
    return this.mediaService.findAll(skip, take, type);
  }

  @Version('1')
  @Get('search')
  async search(@Query('q') query: string) {
    if (!query || query.length < 2) {
      return [];
    }
    return this.mediaService.search(query);
  }

  @Version('1')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Version('1')
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  async update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Version('1')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.mediaService.delete(id);
  }
}

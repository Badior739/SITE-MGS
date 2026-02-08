import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req, Version } from '@nestjs/common';
import { PagesService, CreatePageDto, UpdatePageDto } from './pages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Version('1')
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  async create(@Body() createPageDto: CreatePageDto, @Req() req: any) {
    return this.pagesService.create(createPageDto, req.user.sub);
  }

  @Version('1')
  @Get()
  async findAll(@Query('skip') skip = 0, @Query('take') take = 10) {
    return this.pagesService.findAll(skip, take);
  }

  @Version('1')
  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.pagesService.findBySlug(slug);
  }

  @Version('1')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Version('1')
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR)
  async update(
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
    @Req() req: any,
  ) {
    return this.pagesService.update(id, updatePageDto, req.user.sub);
  }

  @Version('1')
  @Post(':id/publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async publish(@Param('id') id: string, @Req() req: any) {
    return this.pagesService.publish(id, req.user.sub);
  }

  @Version('1')
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.pagesService.delete(id);
  }
}

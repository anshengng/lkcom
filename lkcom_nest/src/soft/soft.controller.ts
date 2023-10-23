import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SoftService } from './soft.service';
import { CreateSoftDto } from './dto/create-soft.dto';
import { UpdateSoftDto } from './dto/update-soft.dto';
import { Admin } from 'src/auth/decorator/admin.decorator';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { user } from '@prisma/client';

@Controller('soft')
export class SoftController {
  constructor(private readonly softService: SoftService) { }

  @Post()
  @Admin()
  create(@Body() dto: CreateSoftDto, @CurrentUser() user: user) {
    return this.softService.create(dto, user);
    //或者可以在service中使用consctruct参数@Inject(REQUEST) private req:Request
  }

  @Get()
  findAll(@Query('page') page:number) {
    return this.softService.findAll(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softService.findOne(+id);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: number, @Body() updateSoftDto: UpdateSoftDto) {
    return this.softService.update(+id, updateSoftDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.softService.remove(+id);
  }
}

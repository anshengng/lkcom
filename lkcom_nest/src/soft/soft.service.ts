import { Injectable } from '@nestjs/common';
import { CreateSoftDto } from './dto/create-soft.dto';
import { UpdateSoftDto } from './dto/update-soft.dto';
import { user } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SoftService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateSoftDto, user: user) {
    const soft = await this.prisma.app.create({
      data: {
        ...data,
        user: {
          connect: {
            id: user.id,
          }
        }
      }
    })
    return soft;
  }

  async findAll(page: number) {
    const row = 8
    const data = await this.prisma.app.findMany({
      skip: (page - 1) * row,
      take: row,
    })
    const total_page = await this.prisma.app.count()
    return {
      meta: {
        current_page: page,
        row,
        total_page
      },
      data
    }
  }

  async findOne(id: number) {
    return await this.prisma.app.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateSoftDto: UpdateSoftDto) {
    return await this.prisma.app.update({
      where: {
        id
      },
      data: {
        ...updateSoftDto
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.app.delete({ where: { id } })
  }
}

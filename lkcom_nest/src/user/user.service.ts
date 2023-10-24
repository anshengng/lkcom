import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) { }

    async update(id: number, dto: UpdateUserDto) {
        return await this.prisma.user.update({
            where: {
                id
            },
            data: {
                ...dto,
                password: dto.password && await hash(dto.password),
            }
        })
    }
}

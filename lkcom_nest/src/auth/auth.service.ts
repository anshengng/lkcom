import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { hash, verify } from 'argon2'
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CaptchaService } from 'src/captcha/captcha.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private cache: CaptchaService) { }
  //注册
  async register(dto: RegisterDTO) {
    await this.cache.verify(dto.captcha)  //判断验证码

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password)
      }
    })
    return user;
  }
  //登录
  async login(dto: LoginDTO) {
    await this.cache.verify(dto.captcha)  //判断验证码

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: dto.name }, { mobile: dto.name }]
      }
    })
    if (await verify(user.password, dto.password)) {
      return this.token(user)
    } else {
      throw new HttpException({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        messages: [{ filed: 'password', message: '密码错误' }]
      }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
  }
  // 获取jwt
  private token(user: user) {
    return {
      token: this.jwt.sign({ id: user.id })
    }
  }
}

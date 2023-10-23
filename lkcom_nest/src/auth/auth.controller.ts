import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/currentUser.decorator';
import { user } from '@prisma/client';
import { Auth } from './decorator/auth.decorator';
import { Admin } from './decorator/admin.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto)
  }

  @Auth()
  // @Admin()
  @Get('test')
  test(@CurrentUser() user: user) {
    return user;
  }
}

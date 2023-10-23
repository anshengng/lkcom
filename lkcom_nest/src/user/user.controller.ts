import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { user } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('current')
  @Auth()
  async current(@CurrentUser() user: user) {
    delete user.password;
    user.avator = user.avator || '/public/assets/default_avator.png';
    return user;
  }

  @Put('update')
  @Auth()
  async update(@Body() dto: UpdateUserDto, @CurrentUser() user: user) {
    if((dto as any).password_confirmed){
      delete (dto as any).password_confirmed
    } // 更新密码时删除确认密码

    const updateState = await this.userService.update(user.id, dto);
    delete updateState.password
    return updateState;
  }

}

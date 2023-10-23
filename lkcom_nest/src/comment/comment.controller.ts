import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { user } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Policy } from 'src/policy/policy.decorator';
import { CommentPolicy } from './comment.policy';
import { PolicyGuard } from 'src/policy/policy.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('comment/:sid')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  //发布软件的评论
  @Post()
  @Auth()
  @Throttle(1, 5)
  create(@Body() createCommentDto: CreateCommentDto, @Param('sid') sid: number, @CurrentUser() user: user) {
    return this.commentService.create(createCommentDto, +sid, user);
  }

  //获取软件的评论
  @Get('')
  findAll(@Param('sid') sid: number) {
    return this.commentService.findAll(+sid);
  }


  @Delete(':id')
  @Policy(CommentPolicy)
  @UseGuards(PolicyGuard)
  @Auth()
  remove(@Param('id') id: number, @Param('sid') sid: number) {
    return this.commentService.remove(+id, +sid);
  }
}

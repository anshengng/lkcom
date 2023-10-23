import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { user } from '@prisma/client';
import { Policy } from 'src/policy/policy.decorator';
import { postPolicy } from './decorator/post.policy';
import { postGuard } from './decorator/postpolicy.guard';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  //发帖
  @Post()
  @Auth()
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: user) {
    return this.postService.create(createPostDto, user.id);
  }

  //获取所有帖子
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  //帖子详情获取
  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  //修改帖子
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  //删除帖子
  @Delete(':id')
  @Policy(postPolicy)
  @UseGuards(postGuard)
  @Auth()
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Post('comment/:pid')
  @Auth()
  comment(@Param('pid') pid: number, @Body() data: CreateCommentDto,@CurrentUser() user: user) {
    return this.postService.comment(+pid, data,user);
  }
}

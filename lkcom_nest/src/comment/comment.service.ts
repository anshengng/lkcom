import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { user } from '@prisma/client';
import { userResponse } from 'src/Pipe/user.response';
import { CommentResponse } from './comment.response';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  //reply是当前评论回复于哪一条评论
  //replys是当前评论的所有回复

  async create(createCommentDto: CreateCommentDto, sid: number, user: user) {
    const {commentId, ...dto } = createCommentDto
    return await this.prisma.comment.create({
      data: {
        ...dto,
        app: { connect: { id: +sid } },
        user: { connect: { id: user.id } },
        reply: commentId && { connect: { id: +commentId } }
      },
      include: {
        user: true,
        replys: true,
      }
    })
  }


  async findAll(sid: number) {
    const commentList = await this.prisma.comment.findMany({
      where: {
        appId: sid,
        commentId: null,
        postId: null
      },
      include: {
        user: true,
        replys: { include: { user: true } },
      }
    })
    return commentList.map(comment => {
      return new CommentResponse(comment).make()
    }) //去掉隐私字段
  }


  remove(id: number, sid: number) {
    return this.prisma.comment.delete({
      where: {
        id,
        appId: sid
      }
    })
  }
}

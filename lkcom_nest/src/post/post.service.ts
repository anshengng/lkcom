import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostResponse } from './post.response';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { user } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto, id: number) {
    const { preview, ...dto } = createPostDto
    const res = await this.prisma.post.create({
      data: {
        ...dto,
        user: { connect: { id } },
        preview: preview || ''
      },
      include: {
        user: true,
        comment: { include: { replys: true } }
      }

    })
    return new PostResponse(res as any).make()
  }

  async findAll() {
    const postList = await this.prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: { createAt: 'desc' }
    });
    return postList.map(post => {
      return new PostResponse(post as any).make() //过滤隐私信息
    })
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        comment: {
          include: {
            user: true,
            replys: {
              include: { user: true } //有用到userResponse,所以需要有user字段
            }
          }
        },
      }
    })
    // return post
    return new PostResponse(post).make()
  }


  async update(id: number, updatePostDto: UpdatePostDto) {
    const { title, content, preview } = updatePostDto
    const res = await this.prisma.post.update({
      where: {
        id
      },
      data: {
        title,
        content,
        preview
      }
    })
    return res;
  }

  async remove(id: number) {
    const res = await this.prisma.post.delete({
      where: {
        id
      }
    })
    return res;
  }

  async comment(pid: number, data: Omit<CreateCommentDto, 'postId'>, user: user) {
    const { commentId, ...dto } = data
    const res = await this.prisma.comment.create({
      data: {
        ...dto,
        user: { connect: { id: user.id } },
        reply: commentId && { connect: { id: +commentId } },
        post: { connect: { id: pid } }
      },
      include: {
        user: true,
        replys: true
      }
    })
    return res;
  }
}

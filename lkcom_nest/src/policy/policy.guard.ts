import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POLICY_KEY } from './policy.decorator';
import { user } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const policy = this.reflector.get<any>(POLICY_KEY, context.getHandler())
    const method = context.getHandler().name //请求的是controller中的那个方法
    const request = context.switchToHttp().getRequest() as Request
    const user = request.user as user

    // 管理员放行
    if (user.id === 1) return true

    const model = await this.prisma.comment.findUnique({
      where: { id: +request.params.id },
    }) //评论不存在的情况可以进行处理

    const policyInstance = new policy(this.prisma, request)

    return policyInstance[method](model, user);
    // return true;
  }
}

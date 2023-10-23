import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { user } from '@prisma/client';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { POLICY_KEY } from 'src/policy/policy.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class postGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //获取poolicy.decorator放入元信息中的policy
    const policy = this.reflector.get<any>(POLICY_KEY, context.getHandler())

    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as user
    const method = context.getHandler().name

    // if (user.id === 1) return true; //管理员放行

    const model = await this.prisma.post.findUnique({
      where: { id: +request.params.id }
    })
    const policyInstance = new policy()

    return policyInstance[method](model, user);
  }
}
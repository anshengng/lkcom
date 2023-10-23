import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const { user } = context.switchToHttp().getRequest(); 
        return user?.id === 3 //只有id正确时通过 限制只有管理员才能
    }
}
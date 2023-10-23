import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigService } from 'src/common/config.service'
import { user } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private prisma: PrismaService) {
        super({
            //解析用户提交的Bearer Token header数据
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //加密码的 secret
            secretOrKey: configService.get('TOKEN_SECRET'),
        })
    }


    //验证通过后获取用户信息放入Request中，@Inject(REQUEST) req:Request
    //可以通过const user = context.switchToHttp().getRequest().user as user得到

    async validate({ id }):Promise<user> {
        const user = this.prisma.user.findUnique({
            where: { id },
        })
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { SoftModule } from './soft/soft.module';
import { UserModule } from './user/user.module';
import { CaptchaModule } from './captcha/captcha.module';
import { CommentModule } from './comment/comment.module';
import { PolicyModule } from './policy/policy.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    PrismaModule,
    UploadModule,
    SoftModule,
    UserModule,
    CaptchaModule,
    CommentModule,
    PolicyModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PostModule,],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  ],
})
export class AppModule { }

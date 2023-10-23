import { Global, Module } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';
import { CacheModule } from '@nestjs/cache-manager';
@Global()
@Module({
  imports: [CacheModule.register({
    ttl: 5000
  })],
  controllers: [CaptchaController],
  providers: [CaptchaService],
  exports: [CaptchaService]
})
export class CaptchaModule {}

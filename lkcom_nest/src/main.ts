import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validatePipeCustom } from './Pipe/validate-pipe-custom';
import { TransformInterceptor } from './transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors()) // 处理跨域
  app.useGlobalPipes(new validatePipeCustom());
  app.useGlobalInterceptors(new TransformInterceptor()); 
  app.useStaticAssets('public', { prefix: '/public' }); 
  //第一个public为静态资源目录。prefix: '/public' 则是用于指定 URL 的前缀
  await app.listen(3000);
}
bootstrap();

import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config';

//用于获取配置文件config，写在env文件可以process.env
@Global()
@Module({
  imports: [ConfigModule.forRoot({
    load: [config],
  })],
  controllers: [],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class CommonModule {}

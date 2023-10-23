import { REQUEST } from '@nestjs/core';
import { ConfigService } from './common/config.service';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private config: ConfigService, @Inject(REQUEST) private req: Request) { }

  @Get()
  getHello(): any {
    return this.config.get('name');
  }
}

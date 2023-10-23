import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Ip } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private captcha: CaptchaService) { }

  @Get()
  async create(@Ip() ip:any) {
    return this.captcha.create(ip)
  }

}

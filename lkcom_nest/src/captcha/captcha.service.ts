import svgCaptcha from 'svg-captcha';
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import md5 from 'md5';
import { now } from 'lodash';

@Injectable()
export class CaptchaService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) { }

  async create(ip: string) {
    const key = md5('captcha' + now() + ip) //使用唯一的key进行缓存
    const svg = svgCaptcha.createMathExpr({
      mathMin: 1,
      mathMax: 10,
      color: true
    })
    await this.cache.set(key, +svg.text, 0);
    return {
      key,
      svg: svg.data
    };
  }

  async verify({ key, value }) {
    const cache = await this.cache.get(key)
    if (!cache) {
      throw new HttpException({
        code: HttpStatus.REQUEST_TIMEOUT,
        messages: { filed: 'verify', message: '验证码已过期，请刷新重试！' }
      }, HttpStatus.REQUEST_TIMEOUT)
    }
    if (cache !== value) {
      throw new HttpException({
        code: HttpStatus.REQUEST_TIMEOUT,
        messages: { filed: 'verify', message: '验证码错误' }
      }, HttpStatus.REQUEST_TIMEOUT)
    }
    return true;
  }
}

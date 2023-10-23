import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class ConfigService {
  constructor(@Inject(config.KEY) private readonly data: ConfigType<typeof config> ) { }
  //config.get('name')获取
  public get(key: keyof ConfigType<typeof config>) {
    return this.data[key];
  }
  //@Inject(config.KEY) public data: ConfigType<typeof config> 这是直接外部使用config.get(name)等获取
  // type config<T> = T extends ()=>infer U?U:T
}

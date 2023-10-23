import { Controller, Post, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Uploader } from './decorator/uploader';
import { Auth } from 'src/auth/decorator/auth.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post('image')
  @Uploader('image')
  // @Auth() //身份验证
  image(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    
    return { url: `/${file.path}` }; //public前没有/会自动拼接当前目录
  }

}

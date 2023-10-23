import { BadRequestException, UseInterceptors, applyDecorators } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

export function Uploader(mime: string, filed = 'file') {
  return applyDecorators(
    UseInterceptors(FileInterceptor(filed, {
      limits: {
        fileSize: 1024 * 1024 * 10 // 10MB
      },
      fileFilter: (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        if (!file.mimetype.includes(mime)) {
          callback(new BadRequestException('上传文件类型错误'), false)
        } else {
          callback(null, true)
        }
      }
    }))
  )
}
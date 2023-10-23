import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        console.log('<-------------拦截器前--------------->')
        const request = context.switchToHttp().getRequest() as Request
        const startTime = Date.now()
        return next.handle().pipe(
            map((data) => {
                // data 将要返回的数据，可进行封装
                const endTime = Date.now()
                new Logger().log(`TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method}`) //控制台打印
                // return {
                //     data: data //可写为data
                // }
                //让数据包裹在data中 "data": {data}
                return data?.meta ? data : { data }
            }),
        )
    }
}
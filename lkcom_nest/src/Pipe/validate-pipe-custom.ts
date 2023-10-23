import { BadRequestException, HttpException, HttpStatus, ValidationPipe } from "@nestjs/common"
import { ValidationError } from "class-validator";

export class validatePipeCustom extends ValidationPipe {
    protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
        const messages = [];
        let message = {}
        // console.log(validationErrors);

        validationErrors.forEach((error) => {
            message['filed'] = error.property
            message['message'] = Object.values(error.constraints)[0];
            messages.push(message)
            message = {}
        });

        //定义返回的error数据格式 
        throw new HttpException({
            code: 422,
            messages: messages
        },
        HttpStatus.UNPROCESSABLE_ENTITY)
    }
}
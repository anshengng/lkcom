import { IsNotEmpty } from "class-validator"
import { IsExit } from "src/rules/is-exit.rule"

export class LoginDTO {

    @IsNotEmpty({ message: '用户名不能为空' })
    @IsExit('user', ['name', 'mobile'], { message: '用户不存在' })
    name: string

    @IsNotEmpty({ message: '密码不能为空' })
    password: string

    @IsNotEmpty({message: '验证码不能为空'})
    captcha: {
        key: string
        value: number
    }

}
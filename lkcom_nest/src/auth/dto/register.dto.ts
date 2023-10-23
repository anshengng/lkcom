import { IsNotEmpty } from "class-validator"
import { IsConfirmed } from "src/rules/is-confirmed.rule"
import { IsNotExit } from "src/rules/is-not-exit.rule"

export class RegisterDTO {

    @IsNotEmpty({ message: '用户名不能为空' })
    @IsNotExit('user', ['name', 'mobile'], { message: '用户名已存在' })
    name: string

    @IsNotEmpty({ message: '密码不能为空' })
    @IsConfirmed({ message: '两次密码输入不一致' })
    password: string

    @IsNotEmpty({ message: '确认密码不能为空' })
    password_confirmed: string

    captcha: {
        key: string,
        value: number
    }
}
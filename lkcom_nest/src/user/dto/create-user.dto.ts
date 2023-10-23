import { IsConfirmed } from "src/rules/is-confirmed.rule"

export class CreateUserDto {
    id: number
    name: string
    nickname?: string

    @IsConfirmed({ message: '两次密码输入不一致' })
    password: string

    realname?: string
    address?: string
    website?: string
    wechat?: string
    microblog?: string
    github?: string
    qq?: string
    mobile?: string
    secret?: string
    avator?: string
    createAt?: string
    updateAt?: string
}

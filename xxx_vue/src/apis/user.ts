import { UserModel } from "#/model";
import { http } from "@/plugins/axios";
export interface User {
    name?: string
    email?: string
    mobile?: string
    secret?: string
    avator?: string
    createAt?: string
    updateAt?: string
    role?: string
    permissions?: string[]
}
export interface loginRes {
    token: string
}
export interface loginRef {
    name: string
    password: string
    captcha: {
        key: string
        value: string
    }
}
export async function userinfo() {
    return http.request<UserModel>({
        url: `/user/current`
    })
}


export async function login(data: loginRef) {
    return http.request<loginRes>({
        url: `/auth/login`,
        method: 'post',
        data
    })
}

export async function getCaptcha() {
    return http.request({
        url: `/captcha`,
    })
}

export async function register(data: any) {
    return http.request({
        url: `/auth/register`,
        method: 'post',
        data
    })
}

export async function update(data: any) {
    return http.request({
        url: `/user/update`,
        method: 'put',
        data
    })
}



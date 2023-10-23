import { MockMethod } from "vite-plugin-mock"

export default [
    {
        url: '/api/info',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'userinfo',
                data: {
                    name: '机烛Officail',
                    age: 22,
                    avator: '/public/images/home.jpg',
                    permissions: ['editor_markdown','editor_base','article_edit']
                }
            }
        }
    },
    {
        url: '/api/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'login',
                data: {
                    token: 'jijiJ#J#IIJ#'
                }
            }
        }
    },
] as MockMethod[]
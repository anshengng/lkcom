import { MockMethod } from "vite-plugin-mock"

export default [
    {
        url: '/api/image',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '上传成功',
                data: {
                    url: '/public/images/home.jpg',
                }
            }
        }
    },
] as MockMethod[]
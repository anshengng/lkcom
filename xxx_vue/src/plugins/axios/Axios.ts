import { ResponseResult } from 'types/Response';
import axios, { AxiosRequestConfig } from "axios";
import store from '@/utils/store';
import { LoginEnum } from '@/enums/LoginEnum';
import ErrorStore from '@/store/userError'

export default class Axios {
    private instance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
        this.interceptor();
    }

    private interceptor() {
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            config => {
                // const headers: AxiosHeaders = {
                //     ...config.headers,
                //     Authorization: 'Bearer ' + store.get(LoginEnum.TOKEN_KEY),
                // };
                // config.headers = headers;
                config.headers.Authorization = 'Bearer ' + store.get(LoginEnum.TOKEN_KEY);
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            res => {
                return res;
            },
            error => {
                //处理错误
                const messages = error.response.data.messages;

                switch (error.response.status) {
                    case 422:
                        //如用户不存在等422错误
                        ErrorStore().setErrors(error.response.data);
                        break;
                    case 400:
                        ErrorStore().setErrors(error.response.data);
                        break;
                    case 408:
                        ElMessage({
                            type: 'error',
                            message: messages.message
                        })
                        break;
                    case 429:
                        ElMessage({
                            type: 'error',
                            message: '操作频繁，请稍后重试！'
                        })
                    //相应操作
                }
                return Promise.reject(error)
            }
        )

    }
    //每次请求都需要使用ResponseResult<User>等太麻烦，优化成D
    public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<D>(config)
                // resolve(response)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }
}

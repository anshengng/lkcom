import { SoftModel } from "#/model";
import { http } from "@/plugins/axios";

export interface ApiType<T> {
    meta: {
        current_page: number;
        row: number;
        total_page: number;
    },
    data: T
}

export async function getSoft(page: number) {
    return http.request<ApiType<SoftModel[]>>({
        url: `/soft/?page=${page}`
    })
}

export async function find(id: number) {
    return http.request<ApiType<SoftModel>>({
        url: `/soft/${id}`
    })
}

export async function add(data: SoftModel) {
    return http.request({
        url: '/soft',
        method: 'post',
        data
    })
}

export async function update(data: SoftModel) {
    return http.request({
        url: `/soft/${+data.id}`,
        method: 'patch',
        data
    })
}

export async function remove(id: number) {
    return http.request({
        url: `/soft/${id}`,
        method: 'delete'
    })
}

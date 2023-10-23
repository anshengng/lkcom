import { http } from "@/plugins/axios";
export interface IArticle {
    id:number
    title:string
    content:string
}

export async function getArticle() {
    return http.request<IArticle[]>({
        url: `article`,
    })
}

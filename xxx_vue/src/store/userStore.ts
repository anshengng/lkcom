import { UserModel } from "#/model";
import { userinfo } from "@/apis/user";
import { defineStore } from "pinia";

export default defineStore('user', {
    state: () => ({
        userInfo: {} as UserModel
    }),
    actions: {
        async getUserInfo(){
            const res = await userinfo()
            this.userInfo = res.data
        }
    }
})
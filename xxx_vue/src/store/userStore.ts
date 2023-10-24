import { UserModel } from "#/model";
import { userinfo } from "@/apis/user";
import { LoginEnum } from "@/enums/LoginEnum";
import utils from "@/utils";
import { defineStore } from "pinia";

export default defineStore('user', {
    state: () => ({
        userInfo: {} as UserModel,
        token: ''
    }),
    actions: {
        async getUserInfo() {
            const res = await userinfo()
            this.userInfo = res.data
            this.token = utils.store.get(LoginEnum.TOKEN_KEY)

        }
    }
})
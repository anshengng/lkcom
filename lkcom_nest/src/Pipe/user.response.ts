import { user } from "@prisma/client";
import { JsonResponse } from "./json.response";

export class userResponse extends JsonResponse<user> {
    protected hidden: (keyof user)[] = ['password', 'mobile', 'address']
    public make(): user {
        super.make()
        this.data.avator = this.data.avator || '/public/assets/default_avator.png'
        return this.data;
    }
}
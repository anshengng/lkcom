import { comment, user } from "@prisma/client";
import { JsonResponse } from "src/Pipe/json.response";
import { userResponse } from "src/Pipe/user.response";

export class CommentResponse extends JsonResponse<comment & { user: user, replys: comment[] }> {
    public make(): comment & { user: user, replys: comment[] } {
        // super.make()
        // super.handler<user>(this.data.user, ["password", "address", "mobile"])
        // super.make()
        this.data.user = new userResponse(this.data.user).make()
        if (this.data.replys) {
            this.data.replys = this.data.replys.map((item) => new CommentResponse(item as any).make())
        }
        return this.data
    }
}
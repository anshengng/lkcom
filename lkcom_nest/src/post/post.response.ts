import { comment, post, user } from "@prisma/client";
import { JsonResponse } from "src/Pipe/json.response";
import { userResponse } from "src/Pipe/user.response";
import { CommentResponse } from "src/comment/comment.response";

export class PostResponse extends JsonResponse<post & { user: user, comment: comment[] }>{

    public make(): any {
        super.make()
        this.data.user = new userResponse(this.data.user).make()

        if(this.data.comment){
            this.data.comment = this.data.comment.map(item => new CommentResponse(item as any).make())
        }
        return this.data
    }
}
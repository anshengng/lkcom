import { post, user } from "@prisma/client";
import { IPolicy } from "src/policy/policy.decorator";

export class postPolicy implements IPolicy {
    constructor() { }

    remove(model: post, user: user) {
        console.log(model,user);
        
        return model.userId === user.id
    }
}
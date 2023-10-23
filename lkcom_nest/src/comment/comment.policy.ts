import { comment, user } from "@prisma/client";
import { Request } from "express";
import { IPolicy } from "src/policy/policy.decorator";
import { PrismaService } from "src/prisma/prisma.service";

export class CommentPolicy implements IPolicy {
    constructor(private prisma: PrismaService, private request: Request) { }

    //nest策略验证，policy.decorator将CommentPolicy设置到元信息，policy.guard就可以实例化并执行下面的remove，然后判断
    remove(model: comment, user: user) {
        return model.userId === user.id;
    }
}
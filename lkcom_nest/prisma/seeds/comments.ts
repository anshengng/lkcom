import { PrismaClient } from "@prisma/client"
import { Random } from "mockjs"


const prisma = new PrismaClient()

export default async function comment() {
    for (let i = 1; i < 10; i++) {
        // 评论
        const res = await prisma.comment.create({
            data: {
                content: Random.csentence(),
                user: { connect: { id: i } },
                app: { connect: { id: i } }
            }
        })
        //创建回复
        await prisma.comment.create({
            data: {
                content: Random.csentence(),
                user: {
                    connect: { id: i }
                },
                app: {
                    connect: { id: i }
                },
                reply: { connect: { id: res.id } }
            }
        })
    }
}
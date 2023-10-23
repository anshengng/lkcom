import { PrismaClient } from "@prisma/client"
import { Random } from "mockjs"

const prisma = new PrismaClient()

export default async function post() {
    for (let i = 1; i < 10; i++) {
        await prisma.post.create({
            data: {
                title: Random.ctitle(),
                content: Random.cparagraph(),
                user: { connect: { id: i } },
                comment: {
                    create: {
                        content: Random.sentence(),
                        user: { connect: { id: i } },
                    }
                }
            }
        })
    }
}
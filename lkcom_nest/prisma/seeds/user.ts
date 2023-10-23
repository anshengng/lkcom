import { PrismaClient } from "@prisma/client"
import { hash } from "argon2"
import { Random } from "mockjs"


const prisma = new PrismaClient()

export const user = async () => {
    for (let i = 1; i < 10; i++) {
        await prisma.user.create({
            data: {
                name: Random.cname(),
                password: await hash('admin'),
                app: {
                    create: {
                        title: Random.ctitle(),
                        content: Random.cparagraph(),
                        preview: Random.image("300x300"),
                        description: Random.cparagraph(),
                    },
                }
            },
        })
    }
}
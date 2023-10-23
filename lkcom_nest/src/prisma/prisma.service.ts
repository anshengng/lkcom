import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        // super(process.env.NODE_APP_ENV==="development"?{log: ['query']}:{});
        super({ log: ['query'] });
    }
}

import { PrismaClient } from '@prisma/client';
import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";

export function IsNotExit(
    table: string, //将要查询的表名
    fileds: string[],
    validationOptions?: ValidationOptions
) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isNotExitRule',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    // console.log(value);
                    // console.log(args);
                    // console.log(propertyName);args.property

                    const prisma = new PrismaClient()
                    const user = await prisma[table].findFirst({
                        where: {
                            OR: fileds.map(filed => ({ [filed]: value }))
                        }
                    })
                    return !Boolean(user);

                },
            },
        });
    }
}



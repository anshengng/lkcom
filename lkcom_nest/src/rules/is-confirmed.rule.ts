import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";

export function IsConfirmed(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'IsConfirmed',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    return Boolean(value === args.object[`${args.property}_confirmed`]);
                },
            },
        });
    }
}
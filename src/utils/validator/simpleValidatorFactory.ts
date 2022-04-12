import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

export function validatorFactory(validator: (value: any) => boolean) {
  @ValidatorConstraint({ async: true })
  class IsBooleanOrStringConstraint implements ValidatorConstraintInterface {
    validate(value: any, _args: ValidationArguments) {
      return validator.call(this, value)
    }
  }

  return function (validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsBooleanOrStringConstraint,
      })
    }
  }
}

import { PipeTransform, Injectable } from '@nestjs/common';
import { ObjectSchema, ValidationOptions } from 'joi';

import { ValidationBadRequestException } from 'src/exceptions';

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform {
  constructor(
    private schema: ObjectSchema<T>,
    private options?: ValidationOptions,
  ) {}

  transform(value: T) {
    const { value: verifiedValue, error } = this.schema.validate(value, {
      convert: true,
      ...this.options,
    });

    if (error) {
      throw new ValidationBadRequestException(error, 'Validation failed');
    }

    return verifiedValue;
  }
}

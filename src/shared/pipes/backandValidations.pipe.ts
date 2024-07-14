// import {
//   ArgumentMetadata,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   PipeTransform,
//   ValidationError,
// } from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';

// @Injectable()
// export class BeckandValidationsPipe implements PipeTransform {
//   async transform(value: any, metaData: ArgumentMetadata) {
//     const object = plainToClass(metaData.metatype, value);
//     const errors = await validate(object);

//     if (errors.length > 0) {
//       return value;
//     }

//     throw new HttpException(
//       { errors: this.formatErrors(errors) },
//       HttpStatus.UNPROCESSABLE_ENTITY,
//     );
//   }

//   formatErrors(errors: ValidationError[]) {
//     return errors.reduce((acc, err) => {
//       acc[err.property] = Object.values(err.constraints);
//       return acc;
//       console.log('transform', acc, err);
//     }, {});
//   }
// }

import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
  ValidationError,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class BackandValidationsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToClass(metadata.metatype, value);

    if (typeof object !== 'object') {
      return value;
    }
    const errors = await validate(object);

    if (errors.length === 0) {
      return value;
    }

    throw new HttpException(
      { errors: this.formatErrors(errors) },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  formatErrors(errors: ValidationError[]) {
    return errors.reduce((acc, error) => {
      acc[error.property] = Object.values(error.constraints);
      return acc;
    }, {});
  }
}

import { isEmpty, isNumber } from 'lodash';
import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform<string, number> {
  constructor(
    private readonly defaultValue: number,
    private readonly min?: number,
    private readonly max?: number,
  ) {}

  transform(value: string, metadata: ArgumentMetadata): number {
    if (isEmpty(value)) {
      return this.defaultValue;
    }

    let val = Number.parseInt(value, 10);
    if (Number.isNaN(val)) {
      throw new BadRequestException(
        `Invalid ${metadata.data} ${metadata.type}`,
      );
    }

    if (isNumber(this.min) && val < this.min) {
      val = this.min;
    }

    if (isNumber(this.max) && val > this.max) {
      val = this.max;
    }

    return val;
  }
}

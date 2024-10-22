import * as sqlString from 'sqlstring';

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SearchStringPipe implements PipeTransform {
  transform(value: any): string | undefined {
    if (!value) return '';

    const stringValue = value.toString().trim();

    if (stringValue.length > 100) {
      throw new BadRequestException('Search query is too long');
    }

    const sanitizedValue = sqlString.escape(stringValue);

    return sanitizedValue.slice(1, -1);
  }
}

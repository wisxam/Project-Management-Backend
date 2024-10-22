import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseOptionalEnumPipe implements PipeTransform<string, string> {
  constructor(
    private readonly values: string[],
    private readonly defaultValue: string,
  ) {}

  transform(value: string): string {
    if (!this.values.includes(value)) {
      return this.defaultValue;
    }

    return value;
  }
}

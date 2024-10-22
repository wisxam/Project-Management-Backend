import { Injectable } from '@nestjs/common';

import { ParseOptionalEnumPipe } from './optional-enum.pipe';

@Injectable()
export class SortOrderPipe extends ParseOptionalEnumPipe {
  constructor() {
    super(['asc', 'desc'], 'desc');
  }
}

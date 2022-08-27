import { FindOperator, ValueTransformer } from 'typeorm';

export class BitTransformer implements ValueTransformer {
  to(
    value: boolean | FindOperator<boolean> | null,
  ): Buffer | FindOperator<boolean> | null {
    if (value instanceof FindOperator) {
      return value;
    } else if (value == null) {
      return null;
    }

    const res = Buffer.alloc(1);
    res[0] = value ? 1 : 0;

    return res;
  }

  from(value: Buffer | null): boolean | null {
    if (value == null) {
      return null;
    }

    return value[0] === 1;
  }
}

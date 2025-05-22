import { Decimal } from '@prisma/client/runtime/library';

export function toNumber(
  value?: Decimal | null | undefined,
): number | undefined {
  return value != null ? value.toNumber() : undefined;
}

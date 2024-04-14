export function validateNumberParam(param: unknown) {
  const parsed = Number(param);
  if (isNaN(parsed)) {
    throw new TypeError();
  }
  return parsed;
}

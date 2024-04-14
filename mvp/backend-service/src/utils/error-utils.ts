export function rethrowSequelizeConnectionRefusedError(err: unknown) {
  if ((err as Error).name === 'SequelizeConnectionRefusedError') {
    throw err;
  }
}

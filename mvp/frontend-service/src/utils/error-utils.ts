import { AxiosError, isAxiosError } from 'axios';
import { ErrorModel } from '../models/ErrorModel';

export function handleAxiosError(error: AxiosError): ErrorModel {
  // ref: https://axios-http.com/docs/handling_errors
  let message = 'unknown';
  let code: number | undefined;
  if (error.response) {
    if ((error.response.data as ErrorModel).message) {
      message = (error.response.data as ErrorModel).message;
      code = error.response.status;
    }
  } else if (error.request) {
    message = 'The request was made but no response was received';
  } else {
    message = error.message;
  }

  return { message, code };
}

export function handleError(err: unknown): ErrorModel {
  if (isAxiosError(err)) {
    return handleAxiosError(err);
  }
  const defaultMessage = 'An unexpected error occurred';
  return { message: err instanceof Error ? err.message : defaultMessage };
}

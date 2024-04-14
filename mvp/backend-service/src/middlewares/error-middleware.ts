import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';

type AxiosErrorResponse = {
  message?: string;
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (axios.isAxiosError(err) && err.response) {
    const errorData = err.response.data as AxiosErrorResponse;
    if (errorData.message) {
      message = errorData.message;
    } else if (err.response.status >= 500) {
      message = 'Internal Server Error';
    } else if (err.response.status >= 400) {
      message = 'Resource Not Found';
    }
    statusCode = err.response.status;
  } else if (err.name === 'ResourceNotFoundError') {
    message = err.message;
    statusCode = 404;
  } else if (err.name === 'UnauthorizedError') {
    message = err.message;
    statusCode = (err as UnauthorizedError).status;
  }
  console.log(JSON.stringify({ statusCode, message }));
  const response: { message: string; stack?: string } = { message };
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

import { NextFunction, Request, Response } from 'express';
import { combined, format, onlyReq, onlyRes } from './formats/format';
import onHeaders from 'on-headers';
import onFinished from 'on-finished';
import { ConsoleLogger, Logger } from '@duccem/duccem-logger';

export interface RequestLoggerOptions {
  format?: string;
  immediate: boolean;
  formatRequest?: string;
  formatResponse?: string;
  logger?: Logger;
}

export function req(
  request: Request,
  response: Response,
  logger: Logger,
  formatString?: string
) {
  const message = format(request, response, formatString || onlyReq);
  logger.http(message);
}

export function res(
  request: Request,
  response: Response,
  logger: Logger,
  formatString?: string
) {
  const message = format(request, response, formatString || onlyRes);
  logger.http(message);
}

export function all(
  request: Request,
  response: Response,
  logger: Logger,
  formatString?: string
) {
  const message = format(request, response, formatString || combined);
  logger.http(message);
}

export default function (
  options: RequestLoggerOptions = {
    format: combined,
    immediate: false,
    formatRequest: onlyReq,
    formatResponse: onlyRes,
  }
) {
  const logger = options.logger ? options.logger : new ConsoleLogger();
  return async (request: Request, response: Response, next: NextFunction) => {
    function logRequest() {
      req(request, response, logger, options.formatRequest);
      res(request, response, logger, options.formatResponse);
    }
    recordStartTime.call(request);
    if (options.immediate) {
      all(request, response, logger, options.format);
    } else {
      onHeaders(response, recordStartTime);
      onFinished(response, logRequest);
    }
    next();
  };
}

function recordStartTime() {
  this._startAt = process.hrtime();
  this._startTime = new Date();
}

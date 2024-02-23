import { Request, Response } from 'express';
import { Colors } from '../types/Colors';
import { METHODS } from '../types/Methods';
import { RESET } from '../types/constants';

export default {
  [':method']: (request: Request) => {
    let methodString = request.method;
    return `${METHODS[methodString]}${methodString}${RESET}`;
  },
  [':http-version']: (request: Request) => {
    const httpVersionString = request.httpVersion;
    return httpVersionString;
  },
  [':url']: (request: Request) => {
    let urlString = request.originalUrl;
    return Colors.INFO + urlString + RESET;
  },
  [':ip']: (request: Request) => {
    const ip = request.ip;
    return Colors.SUCCESS + ip + RESET;
  },
  [':status']: (_request: Request, response: Response) => {
    let statusString = new String(response.statusCode || '-');
    switch (statusString[0]) {
      case '2':
        statusString = Colors.SUCCESS + statusString + RESET;
        break;
      case '3':
        statusString = Colors.INFO + statusString + RESET;
        break;
      case '4':
        statusString = Colors.WARNING + statusString + RESET;
        break;
      case '5':
        statusString = Colors.ERROR + statusString + RESET;
        break;
    }
    return statusString;
  },
  [':response-time']: (request: any, response: any) => {
    const digits = 3;
    if (!response._startTime) response._startTime = process.hrtime();
    const elapsedTimeInMs = (
      (response._startTime[0] - request._startTime[0]) * 1e3 +
      (response._startTime[1] - request._startTime[1]) / 1e6
    ).toFixed(digits);
    return elapsedTimeInMs;
  },
  [':user-agent']: (request: Request) => {
    return request.headers['user-agent'];
  },
  [':content-length']: (response: Response) => {
    return response.getHeader('content-length');
  },
  [':referrer']: (request: Request) => {
    return request.headers.referer || request.headers.referrer;
  },
};

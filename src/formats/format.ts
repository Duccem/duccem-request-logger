import { Request, Response } from 'express';
import tokens from './tokens';
export function format(request: Request, response: Response, format: string) {
  Object.keys(tokens).forEach((token) => {
    format = format.replace(token, tokens[token](request, response));
  });
  return format;
}

export const onlyReq =
  'Requested :method :http-version :url from :ip :referrer :user-agent';
export const onlyRes =
  'Responded to :url requested by :ip with status :status (:content-length) bytes in :response-time ms';
export const combined =
  'Requested :method :http-version :url from :ip :referrer :user-agent Responded  with status :status (:content-length) in :response-time ms';

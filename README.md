# Ducentrace

A middleware to trace the request and response on an express server

## Installation
```bash
$ npm install --save @duccem/duccem-request-logger
```

## Usage

```js
const app = require('express')();
const requestLogger = require('@duccem/duccem-request-logger');

app.use(requestLogger());
app.listen(80, () => {
	console.log('Server listening on port 80');
});
```

## Options
The options let you configure the template format and the execution order

```js
interface RequestLoggerOptions {
  format: string; // format if immediate is true
  immediate: boolean; // to log immediate after the request start
	formatRequest?: string; // format of the request log
  formatResponse?: string; // format of the response log
} 
```

## Formats
The list of formats by default

- Request: "Requested :method :http-version :url from :ip :referrer :user-agent"
- Response: "Responded to :url requested by :ip with status :status (:content-length) bytes in :response-time ms"
- Combined: "Requested :method :http-version :url from :ip :referrer :user-agent Responded  with status :status (:content-length) in :response-time ms"

## Tokens

The tokens that you can use in the format

| Token           | Description                   |
| ----------------|-------------------------------|
| :method         | HTTP method                   |
| :http-version   | HTTP version                  |
| :ip             | Direction of the requester    |
| :status         | Response Status Code          |
| :response-time  | Time of the response end      |
| :user-agent     | Client that made the request  |
| :content-length | Size in bytes of the response |
| :referrer       | Request referrer              |

Author: **Duccem**

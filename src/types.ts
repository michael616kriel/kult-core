import {
  Context as KoaContext,
  Request as KoaRequest,
  Response as KoaResponse,
} from 'koa';

export type ServerOptions = {
  port: number;
};

export type Context = KoaContext;
export type Request = KoaRequest;
export type Response = KoaResponse;

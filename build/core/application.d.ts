/// <reference types="koa__cors" />
import { Database } from './database';
import { Plugins } from './plugins';
import { Server } from './server';
import cors from '@koa/cors';
export type ApplicationOptions = {
    cors?: cors.Options;
};
export declare class Application {
    server: Server;
    plugins: Plugins;
    database: Database;
    constructor(options?: ApplicationOptions);
    start(): void;
}

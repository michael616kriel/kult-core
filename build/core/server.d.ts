import { default as Koa } from 'koa';
import { ServerOptions } from '../types';
import { Application, ApplicationOptions } from './application';
import { ControllerBase } from './controllers';
export declare class Server {
    application: Application;
    server: Koa;
    options: ServerOptions;
    routes: {
        path: string;
        action: string;
        method: string;
        controller: string;
        controllerPath: string;
    }[];
    controllers: {
        metadata: any;
        instance: ControllerBase;
    }[];
    constructor(application: Application, options?: ApplicationOptions);
    initialize(): Promise<void>;
    setupControllers(): Promise<void>;
    createControllerInstance(target: any, ...args: any): any;
    displayRoutes(): void;
    listen(): Promise<void>;
}

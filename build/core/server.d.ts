import { default as Koa } from 'koa';
import { ServerOptions } from '../types';
import { Application } from './application';
import { ControllerBase, ControllerMetaType } from './controllers';
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
        metadata: ControllerMetaType;
        instance: ControllerBase;
    }[];
    constructor(application: Application);
    initialize(): Promise<void>;
    registerControllers(controllers: typeof ControllerBase[]): Promise<void>;
    start(): Promise<void>;
    mapControllerRoutes(controllers: {
        metadata: ControllerMetaType;
        instance: ControllerBase;
    }[]): Promise<void>;
    createControllerInstance(target: any, ...args: any): any;
    displayRoutes(): void;
    listen(): Promise<void>;
}

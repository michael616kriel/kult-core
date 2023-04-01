import Koa from 'koa';
import { EntitySchema } from 'typeorm';
import { Application } from './application';
export declare class ControllerBase {
    app: Application;
    constructor(app: Application);
}
export declare const CONTROLLER_META_KEY: unique symbol;
export declare const PLUGIN_META_KEY: unique symbol;
export declare const DECORATOR_META_KEY: unique symbol;
export declare enum DecoratorKey {
    ROUTE = "route",
    VALIDATION = "validation",
    HOOK = "hook"
}
type MetadataItem = {
    path?: string;
    method?: string;
    type: DecoratorKey | string;
    property: string;
    callback?: (ctx: Koa.Context, next: Koa.Next) => void;
};
type ControllerActionType = {
    path: string;
    property: string;
    method: string;
    middleware: MetadataItem[];
};
export type ControllerMetaType = {
    path: string;
    name: string;
    actions: ControllerActionType[];
};
export type PluginMetaType = {
    name: string;
    controllers?: typeof ControllerBase[];
    models?: EntitySchema[];
};
export declare const Hook: (callback: (ctx: Koa.Context, next: Koa.Next) => void) => (target: Object, property: string) => void;
export declare const CoreHook: (options: Object) => (target: Object, property: string) => void;
export declare const Plugin: (options: PluginMetaType) => (constructor: Function) => void;
export declare const Controller: (path: string) => (constructor: Function) => void;
export declare const getPluginMetadata: (target: Function) => PluginMetaType;
export declare const getControllerMetadata: (target: ControllerBase) => ControllerMetaType;
export declare const Get: (path: string) => (target: Object, property: string) => void;
export declare const Post: (path: string) => (target: Object, property: string) => void;
export declare const Put: (path: string) => (target: Object, property: string) => void;
export declare const Delete: (path: string) => (target: Object, property: string) => void;
export declare const Patch: (path: string) => (target: Object, property: string) => void;
export declare const Options: (path: string) => (target: Object, property: string) => void;
export declare const Validate: (options: {
    [key: string]: string;
}) => (target: Object, property: string) => void;
export {};

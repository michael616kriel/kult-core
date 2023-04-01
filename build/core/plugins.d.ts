import { Application } from './application';
import { PluginMetaType } from './controllers';
export declare class PluginBase {
    app: Application;
    constructor(app: Application);
    initialize(): Promise<void>;
}
export declare class Plugins {
    application: Application;
    plugins: {
        instance: PluginBase;
        metadata: PluginMetaType;
    }[];
    constructor(application: Application);
    loadPlugins(): Promise<void>;
    displayPlugins(): void;
    createPluginInstance(target: any, app: Application): any;
    start(): Promise<void>;
}

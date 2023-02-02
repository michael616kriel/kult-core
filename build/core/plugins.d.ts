import { Application } from './application';
import { PluginMetaType } from './controllers';
export declare class PluginBase {
    app: Application;
    constructor(app: Application);
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
    createPluginInstance(target: any, ...args: any): any;
    startPlugins(): Promise<void>;
}

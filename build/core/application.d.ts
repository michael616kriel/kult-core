import { Database } from './database';
import { Plugins } from './plugins';
import { Server } from './server';
export declare class Application {
    server: Server;
    plugins: Plugins;
    database: Database;
    constructor();
    start(): Promise<void>;
}

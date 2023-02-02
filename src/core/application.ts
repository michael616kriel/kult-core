import { Database } from './database';
import { Plugins } from './plugins';
import { Server } from './server';
import figlet from 'figlet';
import cors from '@koa/cors';

export type ApplicationOptions = {
  cors?: cors.Options;
};
export class Application {
  server: Server;
  plugins: Plugins;
  database: Database;

  constructor(options?: ApplicationOptions) {
    this.database = new Database();
    this.server = new Server(this, options);
    this.plugins = new Plugins(this);
  }

  async start() {
    console.log(figlet.textSync('KULT'));
    await this.server.setupControllers();
    await this.plugins.startPlugins();
    this.server.listen();
    
  }
}

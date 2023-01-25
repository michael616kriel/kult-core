import { Database } from 'core/database';
import { Plugins } from 'core/plugins';
import { Server } from 'core/server';
import figlet from 'figlet';

export class Application {
  server: Server;
  plugins: Plugins;
  database: Database;

  constructor() {
    this.database = new Database();
    this.server = new Server(this);
    this.plugins = new Plugins(this);
  }

  start() {
    console.log(figlet.textSync('KULT'));
    this.plugins.startPlugins();
    this.server.listen();
  }
}

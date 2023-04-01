import { Database } from './database';
import { Plugins } from './plugins';
import { Server } from './server';
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

  async start() {
    console.log(figlet.textSync('KULT'));
    await this.server.start();
    await this.plugins.start();
    await this.database.start();
    this.server.listen();
  }
}

import { DatabaseManager } from 'core/database_manager';
import { PluginManager } from 'core/plugin_manager';
import { ServerManager } from 'core/server_manager';
import figlet from 'figlet';

export class Application {
  server_manager: ServerManager;
  plugin_manager: PluginManager;
  database_manager: DatabaseManager;

  constructor() {
    this.database_manager = new DatabaseManager();
    this.server_manager = new ServerManager(this);
    this.plugin_manager = new PluginManager(this);
  }

  start() {
    console.log(figlet.textSync('Nova'));
    this.plugin_manager.startPlugins();
    this.server_manager.listen();
  }
}

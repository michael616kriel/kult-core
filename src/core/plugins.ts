import chalk from 'chalk';
import { Application } from './application';
import { readdirSync } from 'fs';
import { join } from 'path';
import { PluginsOptions } from 'types';
import { getProjectRoot, loadConfig } from '../utils/helpers';
import { getPluginMetadata, PluginMetaType } from './controllers';

export class PluginBase {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async initialize() {
    return;
  }
}

export class Plugins {
  application: Application;
  plugins: { instance: PluginBase; metadata: PluginMetaType }[];

  constructor(application: Application) {
    this.application = application;
    this.plugins = [];
  }

  async loadPlugins() {
    // load plugins from project
    const root = getProjectRoot();
    const pluginPaths = join(root, './plugins');
    const files = await readdirSync(pluginPaths);

    for (const key in files) {
      const pluginModule = (await import(join(pluginPaths, files[key])))
        .default;
      const instance = this.createPluginInstance(
        pluginModule,
        this.application
      );
      const metadata = getPluginMetadata(instance);
      if (metadata.controllers) {
        this.application.server.registerControllers(metadata.controllers);
      }
      this.plugins.push({
        instance,
        metadata,
      });
    }

    // load plugins from node_modules
    const config = await loadConfig<PluginsOptions>('plugins');

    for (const key in config.plugins) {
      const instance = this.createPluginInstance(
        config.plugins[key],
        this.application
      );
      const metadata = getPluginMetadata(instance);
      if (metadata.controllers) {
        this.application.server.registerControllers(metadata.controllers);
      }
      this.plugins.push({
        instance,
        metadata,
      });
    }
  }

  displayPlugins() {
    console.log(chalk.blue(chalk.bold('Plugins:')));
    const plugins = this.plugins;
    if (!plugins || !plugins.length) {
      console.log(chalk.white('no plugins installed'));
    }
    for (const plugin of plugins) {
      console.log(chalk.white(`- ${plugin.metadata.name}`));
    }
    console.log('');
  }

  createPluginInstance(target: any, app: Application) {
    return new target(app);
  }

  async start() {
    await this.loadPlugins();
    for (const plugin of this.plugins) {
      await plugin.instance.initialize();
    }
    this.displayPlugins();
  }
}

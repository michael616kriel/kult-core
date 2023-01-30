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
}

export class Plugins {
  application: Application;
  plugins: { instance: PluginBase; metadata: PluginMetaType }[];

  constructor(application: Application) {
    this.application = application;
    this.plugins = [];
  }

  async loadPlugins() {
    // load plugins from node_modules
    const config = await loadConfig<PluginsOptions>('plugins');
    await config.plugins.forEach(async (plugin) => {
      const instance = this.createPluginInstance(plugin, this.application);
      const metadata = getPluginMetadata(instance);
      this.plugins.push({
        instance,
        metadata,
      });
    });

    // load plugins from project
    const root = getProjectRoot();
    const pluginPaths = join(root, './plugins');
    const files = await readdirSync(pluginPaths);
    await files.forEach(async (folder) => {
      const pluginModule = (await import(join(pluginPaths, folder))).default;
      const instance = this.createPluginInstance(
        pluginModule,
        this.application
      );
      const metadata = getPluginMetadata(instance);
      this.plugins.push({
        instance,
        metadata,
      });
    });
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

  createPluginInstance(target: any, ...args: any) {
    return new target(...args);
  }

  async startPlugins() {
    await this.loadPlugins();
    this.displayPlugins();
  }
}

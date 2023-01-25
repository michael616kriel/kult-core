import chalk from 'chalk';
import { Application } from 'core/application';
import { readdirSync } from 'fs';
import { join } from 'path';
import { getProjectRoot } from 'utils/helpers';
import { KultCore } from '.';

export class PluginBase {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
}

export class Plugins {
  application: Application;

  constructor(application: Application) {
    this.application = application;
  }

  async loadPlugins() {
    const root = getProjectRoot();
    const pluginPaths = join(root, './plugins');
    const files = await readdirSync(pluginPaths);
    await files.forEach(async (folder) => {
      (await import(join(pluginPaths, folder))).default;
    });
  }

  displayPlugins() {
    console.log(chalk.blue(chalk.bold('Plugins:')));
    const plugins = KultCore.getPlugins();
    if (!plugins || !plugins.length) {
      console.log(chalk.white('no plugins installed'));
    }
    for (const plugin of plugins) {
      console.log(chalk.white(`- ${plugin.name}`));
    }
    console.log('');
  }

  createPluginInstance(func: Function, params?: any) {
    return new (Function.prototype.bind.apply(func, params))();
  }

  async startPlugins() {
    await this.loadPlugins();
    this.displayPlugins();
    const plugins = KultCore.getPlugins();
    for (const plugin of plugins) {
      this.createPluginInstance(plugin.func, this.application);
    }
  }
}

import chalk from 'chalk';
import { Application } from 'core/application';
import { readdirSync } from 'fs';
import { Context, default as Koa } from 'koa';
import Router from 'koa-router';
import { join } from 'path';
import { getProjectRoot, loadConfig } from 'utils/helpers';
import { Core } from './decorators';

export type ServerManagerOptions = {
  port: number;
};

export class ServerManager {
  application: Application;
  server: Koa;
  router: Router;
  options: ServerManagerOptions;

  constructor(application: Application) {
    this.application = application;
    this.options = {} as ServerManagerOptions;
    this.server = new Koa();
    this.router = new Router();
    this.initialize();
  }

  async initialize() {
    const config = await loadConfig<ServerManagerOptions>('server');
    this.options = config;
  }

  async setupControllers() {
    const root = getProjectRoot();
    const controllerPaths = join(root, './app/controllers');
    const files = await readdirSync(controllerPaths);
    await files.forEach(async (file) => {
      (await import(join(root, './app/controllers', file))).default;
    });
    const routes = Core.getRoutes();
    for (const route of routes) {
      const { path, method, callback } = route;
      const action = async (ctx: Context) => {
        ctx.body = await callback(ctx);
      };
      switch (method) {
        case 'GET':
          this.router.get(path, action);
          break;
        case 'POST':
          this.router.post(path, action);
          break;
        case 'DELETE':
          this.router.delete(path, action);
          break;
        case 'PUT':
          this.router.put(path, action);
          break;
        case 'PATCH':
          this.router.patch(path, action);
          break;
      }
    }
    this.server.use(this.router.routes()).use(this.router.allowedMethods());
  }

  displayRoutes() {
    console.log(chalk.blue(chalk.bold('Routes:')));
    const routes = Core.getRoutes();
    for (const route of routes) {
      const { path, method, controller, name } = route;
      console.log(chalk.white(`- [${method}] ${path} ${controller}.${name}`));
    }
    console.log('');
  }

  async listen() {
    await this.setupControllers();
    this.displayRoutes();
    this.server.listen(this.options.port, () => {
      console.log(
        `${chalk.green(chalk.bold('Server started:'))} ${chalk.white(
          `http://localhost:${this.options.port} 🚀`
        )}`
      );
    });
  }
}

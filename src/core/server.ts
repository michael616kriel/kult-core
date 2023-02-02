import chalk from 'chalk';
import { readdirSync } from 'fs';
import { Context, default as Koa, Next } from 'koa';
import Router from 'koa-router';
import { join } from 'path';
import { ServerOptions } from 'types';
import { getProjectRoot, loadConfig } from '../utils/helpers';
import { Application, ApplicationOptions } from './application';
import { ControllerBase, getControllerMetadata } from './controllers';
import cors from '@koa/cors';

export class Server {
  application: Application;
  server: Koa;
  options: ServerOptions;
  routes: {
    path: string;
    action: string;
    method: string;
    controller: string;
    controllerPath: string;
  }[];
  controllers: { metadata: any; instance: ControllerBase }[];

  constructor(application: Application, options?: ApplicationOptions) {
    this.controllers = [];
    this.application = application;
    this.options = {} as ServerOptions;
    this.server = new Koa();
    this.routes = [];
    this.initialize();
  }

  async initialize() {
    const config = await loadConfig<ServerOptions>('server');
    const corsConfig = await loadConfig<cors.Options>('cors');
    this.options = config;

    this.server.use(cors(corsConfig));
  }

  async setupControllers() {
    const root = getProjectRoot();
    const controllerPaths = join(root, './app/controllers');
    const files = await readdirSync(controllerPaths);

    const controllers = await Promise.all(
      files.map(async (file) => {
        const controllerModule = (await import(join(controllerPaths, file)))
          .default;
        const instance = this.createControllerInstance(
          controllerModule,
          this.application
        );
        const metadata = getControllerMetadata(instance);
        return {
          metadata,
          instance,
        };
      })
    );

    this.controllers = controllers;

    for (const controller of controllers) {
      const router = new Router({
        prefix: controller.metadata.path,
      });
      for (const action of controller.metadata.actions) {
        const controllerAction = async (ctx: Context, next: Next) => {
          await action.middleware.forEach(
            async ({ callback }) => callback && (await callback(ctx, next))
          );
          ctx.body = await controller?.instance[action.property](
            ctx,
            this.application
          );
        };
        switch (action.method) {
          case 'GET':
            router.get(action.path, controllerAction);
            break;
          case 'POST':
            router.post(action.path, controllerAction);
            break;
          case 'DELETE':
            router.delete(action.path, controllerAction);
            break;
          case 'PUT':
            router.put(action.path, controllerAction);
            break;
          case 'PATCH':
            router.patch(action.path, controllerAction);
            break;
          case 'OPTIONS':
            router.options(action.path, controllerAction);
            break;
        }
        this.routes.push({
          path: action.path,
          action: action.property,
          method: action.method,
          controller: controller.metadata.name,
          controllerPath: controller.metadata.path,
        });
      }
      this.server.use(router.routes()).use(router.allowedMethods());
    }
  }

  createControllerInstance(target: any, ...args: any) {
    return new target(...args);
  }

  displayRoutes() {
    console.log(chalk.blue(chalk.bold('Routes:')));
    for (const route of this.routes) {
      const { path, method, controller, action, controllerPath } = route;
      console.log(
        chalk.white(
          `- [${method}] ${join(controllerPath, path)} ${controller}.${action}`
        )
      );
    }
    console.log('');
  }

  async listen() {
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

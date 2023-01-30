import Koa from 'koa';
import { validRequestBody } from 'utils/helpers';
import { Application } from './application';
import { PluginBase } from './plugins';

export class ControllerBase {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
}

export const CONTROLLER_META_KEY = Symbol('@kult/core/controller');
export const PLUGIN_META_KEY = Symbol('@kult/core/plugin');
export const DECORATOR_META_KEY = Symbol('@kult/core/decorator');

export enum DecoratorKey {
  ROUTE = 'route',
  JWT = 'jwt',
  VALIDATION = 'validation',
  LOGGER = 'logger',
  HOOK = 'hook',
}

type MetadataItem = {
  path?: string;
  method?: string;
  type: DecoratorKey;
  property: string;
  callback?: (ctx: Koa.Context, next: Koa.Next) => void;
};

type ControllerActionType = {
  path: string;
  property: string;
  method: string;
  middleware: MetadataItem[];
};

export type ControllerMetaType = {
  path: string;
  name: string;
  actions: ControllerActionType[];
};

export type PluginMetaType = {
  name: string;
};

// Decorator helpers
export const Hook = (callback: (ctx: Koa.Context, next: Koa.Next) => void) => {
  return (target: Object, property: string) => {
    const hooks: MetadataItem[] =
      Reflect.getOwnMetadata(DECORATOR_META_KEY, target) || [];
    hooks.push({
      property,
      type: DecoratorKey.HOOK,
      callback,
    });
    return Reflect.defineMetadata(DECORATOR_META_KEY, hooks, target);
  };
};

export const CoreHook = (options: Object) => {
  return (target: Object, property: string) => {
    const hooks = Reflect.getOwnMetadata(DECORATOR_META_KEY, target) || [];
    hooks.push({
      property,
      ...options,
    });
    return Reflect.defineMetadata(DECORATOR_META_KEY, hooks, target);
  };
};

export const KultPlugin = (name: string) => {
  return (constructor: Function) => {
    return Reflect.defineMetadata(
      PLUGIN_META_KEY,
      {
        name,
      },
      constructor.prototype
    );
  };
};

export const KultController = (path: string) => {
  return (constructor: Function) => {
    const controllerPath = !path.startsWith('/') ? `/${path}` : path;
    return Reflect.defineMetadata(
      CONTROLLER_META_KEY,
      {
        path: controllerPath,
        name: constructor.name,
      },
      constructor.prototype
    );
  };
};

export const getPluginMetadata = (target: PluginBase): PluginMetaType => {
  const pluginMeta = Reflect.getMetadata(PLUGIN_META_KEY, target);
  return pluginMeta as PluginMetaType;
};

export const getControllerMetadata = (
  target: ControllerBase
): ControllerMetaType => {
  const controllerMeta: ControllerMetaType = Reflect.getMetadata(
    CONTROLLER_META_KEY,
    target
  );
  const data: MetadataItem[] = Reflect.getMetadata(DECORATOR_META_KEY, target);
  const routes = data.filter((item) => item.type === DecoratorKey.ROUTE);
  const middlewares = data.filter((item) => item.type !== DecoratorKey.ROUTE);
  return {
    ...controllerMeta,
    actions: routes.map((route) => {
      return {
        path: route.path,
        method: route.method,
        property: route.property,
        middleware: middlewares.filter(
          (middleware: { property: string }) =>
            middleware.property === route.property
        ),
      } as ControllerActionType;
    }),
  } as ControllerMetaType;
};

export const Get = (path: string) => {
  return CoreHook({
    type: DecoratorKey.ROUTE,
    method: 'GET',
    path,
  });
};

export const Post = (path: string) => {
  return CoreHook({
    type: DecoratorKey.ROUTE,
    method: 'POST',
    path,
  });
};

export const Put = (path: string) => {
  return CoreHook({
    type: DecoratorKey.ROUTE,
    method: 'PUT',
    path,
  });
};

export const Delete = (path: string) => {
  return CoreHook({
    type: DecoratorKey.ROUTE,
    method: 'DELETE',
    path,
  });
};

export const Patch = (path: string) => {
  return CoreHook({
    type: DecoratorKey.ROUTE,
    method: 'PATCH',
    path,
  });
};

export const Options = (path: string) => {
  return CoreHook({
    type: DecoratorKey.ROUTE,
    method: 'Options',
    path,
  });
};

export const Validate = (options: { [key: string]: string }) => {
  return CoreHook({
    type: DecoratorKey.VALIDATION,
    callback: (ctx: Koa.Context, next: Koa.Next) => {
      const isValid = validRequestBody(
        // @ts-ignore
        ctx.request.body || ctx.request.query,
        options
      );
      if (!isValid) {
        ctx.throw('Invalid request: body did not pass validation');
      }
    },
  });
};

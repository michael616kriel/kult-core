import { Application } from './application';
import { join } from 'path';
import 'reflect-metadata';
import { PluginBase } from './plugins';

export const CONTROLLER_META_KEY = Symbol('controller');
export const CONTROLLER_ACTION_META_KEY = Symbol('controller:action');
export const PLUGIN_META_KEY = Symbol('plugin');

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

const actionMethod = (method: string) => {
  return (path: string) => {
    return (target: any, propertyKey: string) => {
      const actions =
        Reflect.getOwnMetadata(CONTROLLER_ACTION_META_KEY, target) || [];
      actions.push({
        path,
        action: propertyKey,
        method,
      });
      return Reflect.defineMetadata(
        CONTROLLER_ACTION_META_KEY,
        actions,
        target
      );
    };
  };
};

export type ControllerMetaType = {
  path: string;
  name: string;
  actions: { path: string; action: string; method: string }[];
};

export type PluginMetaType = {
  name: string;
};

export const getControllerMetadata = (
  target: ControllerBase
): ControllerMetaType => {
  const controllerMeta = Reflect.getMetadata(CONTROLLER_META_KEY, target);
  const actionMeta = Reflect.getMetadata(CONTROLLER_ACTION_META_KEY, target);
  return {
    ...controllerMeta,
    actions: actionMeta.map((meta: any) => ({
      ...meta,
      path: meta.path,
    })),
  } as ControllerMetaType;
};

export const getPluginMetadata = (target: PluginBase): PluginMetaType => {
  const pluginMeta = Reflect.getMetadata(PLUGIN_META_KEY, target);
  return pluginMeta as PluginMetaType;
};

export const Get = actionMethod('GET');
export const Post = actionMethod('POST');
export const Put = actionMethod('PUT');
export const Delete = actionMethod('DELETE');

export class ControllerBase {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
}

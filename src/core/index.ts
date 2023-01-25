export class KultCore {
  static routes: {
    method: string;
    path: string;
    controller: string;
    name: string;
    callback: Function;
  }[] = [];
  static controllers: {
    name: string;
    func: Function;
  }[] = [];
  static plugins: {
    name: string;
    func: Function;
  }[] = [];
  static registerController(name: string, func: Function) {
    KultCore.controllers.push({
      name,
      func,
    });
  }
  static registerRoute(
    method: string,
    path: string,
    controller: string,
    name: string,
    callback: Function
  ) {
    KultCore.routes.push({
      path,
      controller,
      callback,
      name,
      method,
    });
  }

  static registerPlugin(name: string, func: Function) {
    KultCore.plugins.push({
      name,
      func,
    });
  }

  static getPlugins() {
    return KultCore.plugins;
  }

  static getRoutes() {
    return KultCore.routes;
  }

  static getControllers() {
    return KultCore.controllers;
  }
}

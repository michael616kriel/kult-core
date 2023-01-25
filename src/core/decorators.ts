export class Core {
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
    Core.controllers.push({
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
    Core.routes.push({
      path,
      controller,
      callback,
      name,
      method,
    });
  }

  static registerPlugin(name: string, func: Function) {
    Core.plugins.push({
      name,
      func,
    });
  }

  static getPlugins() {
    return Core.plugins;
  }

  static getRoutes() {
    return Core.routes;
  }

  static getControllers() {
    return Core.controllers;
  }
}

export const Controller = () => {
  return (target: Function) => {
    Core.registerController(target.name, target);
  };
};

export const NovaPlugin = (name: string) => {
  return (target: Function) => {
    Core.registerPlugin(name, target);
  };
};

export const Post = (path: string) => {
  return (
    target: ControllerBase,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    Core.registerRoute(
      'POST',
      path,
      target.constructor.name,
      memberName,
      propertyDescriptor.value
    );
  };
};

export const Get = (path: string) => {
  return (
    target: ControllerBase,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    Core.registerRoute(
      'GET',
      path,
      target.constructor.name,
      memberName,
      propertyDescriptor.value
    );
  };
};

export const Put = (path: string) => {
  return (
    target: ControllerBase,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    Core.registerRoute(
      'PUT',
      path,
      target.constructor.name,
      memberName,
      propertyDescriptor.value
    );
  };
};

export const Delete = (path: string) => {
  return (
    target: ControllerBase,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    Core.registerRoute(
      'DELETE',
      path,
      target.constructor.name,
      memberName,
      propertyDescriptor.value
    );
  };
};

export class ControllerBase {}

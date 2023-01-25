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

export const KultController = () => {
  return (target: Function) => {
    KultCore.registerController(target.name, target);
  };
};

export const KultPlugin = (name: string) => {
  return (target: Function) => {
    KultCore.registerPlugin(name, target);
  };
};

export const Post = (path: string) => {
  return (
    target: ControllerBase,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    KultCore.registerRoute(
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
    KultCore.registerRoute(
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
    KultCore.registerRoute(
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
    KultCore.registerRoute(
      'DELETE',
      path,
      target.constructor.name,
      memberName,
      propertyDescriptor.value
    );
  };
};

export class ControllerBase {}

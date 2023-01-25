import { KultCore } from 'core';
import { Application } from './application';

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

export class ControllerBase {
  app: Application;
  constructor(app: Application) {
    this.app = app;
  }
}

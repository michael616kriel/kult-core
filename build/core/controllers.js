"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.Options = exports.Patch = exports.Delete = exports.Put = exports.Post = exports.Get = exports.getControllerMetadata = exports.getPluginMetadata = exports.KultController = exports.KultPlugin = exports.CoreHook = exports.Hook = exports.DecoratorKey = exports.DECORATOR_META_KEY = exports.PLUGIN_META_KEY = exports.CONTROLLER_META_KEY = exports.ControllerBase = void 0;
const helpers_1 = require("../utils/helpers");
class ControllerBase {
    constructor(app) {
        this.app = app;
    }
}
exports.ControllerBase = ControllerBase;
exports.CONTROLLER_META_KEY = Symbol('@kult/core/controller');
exports.PLUGIN_META_KEY = Symbol('@kult/core/plugin');
exports.DECORATOR_META_KEY = Symbol('@kult/core/decorator');
var DecoratorKey;
(function (DecoratorKey) {
    DecoratorKey["ROUTE"] = "route";
    DecoratorKey["VALIDATION"] = "validation";
    DecoratorKey["HOOK"] = "hook";
})(DecoratorKey = exports.DecoratorKey || (exports.DecoratorKey = {}));
// Decorator helpers
const Hook = (callback) => {
    return (target, property) => {
        const hooks = Reflect.getOwnMetadata(exports.DECORATOR_META_KEY, target) || [];
        hooks.push({
            property,
            type: DecoratorKey.HOOK,
            callback,
        });
        return Reflect.defineMetadata(exports.DECORATOR_META_KEY, hooks, target);
    };
};
exports.Hook = Hook;
const CoreHook = (options) => {
    return (target, property) => {
        const hooks = Reflect.getOwnMetadata(exports.DECORATOR_META_KEY, target) || [];
        hooks.push({
            property,
            ...options,
        });
        return Reflect.defineMetadata(exports.DECORATOR_META_KEY, hooks, target);
    };
};
exports.CoreHook = CoreHook;
const KultPlugin = (name) => {
    return (constructor) => {
        return Reflect.defineMetadata(exports.PLUGIN_META_KEY, {
            name,
        }, constructor.prototype);
    };
};
exports.KultPlugin = KultPlugin;
const KultController = (path) => {
    return (constructor) => {
        const controllerPath = !path.startsWith('/') ? `/${path}` : path;
        return Reflect.defineMetadata(exports.CONTROLLER_META_KEY, {
            path: controllerPath,
            name: constructor.name,
        }, constructor.prototype);
    };
};
exports.KultController = KultController;
const getPluginMetadata = (target) => {
    const pluginMeta = Reflect.getMetadata(exports.PLUGIN_META_KEY, target);
    return pluginMeta;
};
exports.getPluginMetadata = getPluginMetadata;
const getControllerMetadata = (target) => {
    const controllerMeta = Reflect.getMetadata(exports.CONTROLLER_META_KEY, target);
    const data = Reflect.getMetadata(exports.DECORATOR_META_KEY, target);
    const routes = data.filter((item) => item.type === DecoratorKey.ROUTE);
    const middlewares = data.filter((item) => item.type !== DecoratorKey.ROUTE);
    return {
        ...controllerMeta,
        actions: routes.map((route) => {
            return {
                path: route.path,
                method: route.method,
                property: route.property,
                middleware: middlewares.filter((middleware) => middleware.property === route.property),
            };
        }),
    };
};
exports.getControllerMetadata = getControllerMetadata;
const Get = (path) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.ROUTE,
        method: 'GET',
        path,
    });
};
exports.Get = Get;
const Post = (path) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.ROUTE,
        method: 'POST',
        path,
    });
};
exports.Post = Post;
const Put = (path) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.ROUTE,
        method: 'PUT',
        path,
    });
};
exports.Put = Put;
const Delete = (path) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.ROUTE,
        method: 'DELETE',
        path,
    });
};
exports.Delete = Delete;
const Patch = (path) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.ROUTE,
        method: 'PATCH',
        path,
    });
};
exports.Patch = Patch;
const Options = (path) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.ROUTE,
        method: 'Options',
        path,
    });
};
exports.Options = Options;
const Validate = (options) => {
    return (0, exports.CoreHook)({
        type: DecoratorKey.VALIDATION,
        callback: (ctx, next) => {
            const isValid = (0, helpers_1.validRequestBody)(
            // @ts-ignore
            ctx.request.body || ctx.request.query, options);
            if (!isValid) {
                ctx.throw('Invalid request: body did not pass validation');
            }
        },
    });
};
exports.Validate = Validate;

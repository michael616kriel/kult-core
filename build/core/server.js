"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const path_1 = require("path");
const helpers_1 = require("../utils/helpers");
const controllers_1 = require("./controllers");
const cors_1 = __importDefault(require("@koa/cors"));
class Server {
    constructor(application, options) {
        this.controllers = [];
        this.application = application;
        this.options = {};
        this.server = new koa_1.default();
        this.routes = [];
        this.initialize();
    }
    async initialize() {
        const config = await (0, helpers_1.loadConfig)('server');
        const corsConfig = await (0, helpers_1.loadConfig)('cors');
        this.options = config;
        this.server.use((0, cors_1.default)(corsConfig));
    }
    async setupControllers() {
        const root = (0, helpers_1.getProjectRoot)();
        const controllerPaths = (0, path_1.join)(root, './app/controllers');
        const files = await (0, fs_1.readdirSync)(controllerPaths);
        const controllers = await Promise.all(files.map(async (file) => {
            var _a;
            const controllerModule = (await (_a = (0, path_1.join)(controllerPaths, file), Promise.resolve().then(() => __importStar(require(_a)))))
                .default;
            const instance = this.createControllerInstance(controllerModule, this.application);
            const metadata = (0, controllers_1.getControllerMetadata)(instance);
            return {
                metadata,
                instance,
            };
        }));
        this.controllers = controllers;
        for (const controller of controllers) {
            const router = new koa_router_1.default({
                prefix: controller.metadata.path,
            });
            for (const action of controller.metadata.actions) {
                const controllerAction = async (ctx, next) => {
                    await action.middleware.forEach(async ({ callback }) => callback && (await callback(ctx, next)));
                    ctx.body = await (controller === null || controller === void 0 ? void 0 : controller.instance[action.property](ctx, this.application));
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
    createControllerInstance(target, ...args) {
        return new target(...args);
    }
    displayRoutes() {
        console.log(chalk_1.default.blue(chalk_1.default.bold('Routes:')));
        for (const route of this.routes) {
            const { path, method, controller, action, controllerPath } = route;
            console.log(chalk_1.default.white(`- [${method}] ${(0, path_1.join)(controllerPath, path)} ${controller}.${action}`));
        }
        console.log('');
    }
    async listen() {
        await this.setupControllers();
        this.displayRoutes();
        this.server.listen(this.options.port, () => {
            console.log(`${chalk_1.default.green(chalk_1.default.bold('Server started:'))} ${chalk_1.default.white(`http://localhost:${this.options.port} 🚀`)}`);
        });
    }
}
exports.Server = Server;

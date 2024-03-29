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
exports.Plugins = exports.PluginBase = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const path_1 = require("path");
const helpers_1 = require("../utils/helpers");
const controllers_1 = require("./controllers");
class PluginBase {
    constructor(app) {
        this.app = app;
    }
    async initialize() {
        return;
    }
}
exports.PluginBase = PluginBase;
class Plugins {
    constructor(application) {
        this.application = application;
        this.plugins = [];
    }
    async loadPlugins() {
        var _a;
        // load plugins from project
        const root = (0, helpers_1.getProjectRoot)();
        const pluginPaths = (0, path_1.join)(root, './plugins');
        const files = await (0, fs_1.readdirSync)(pluginPaths);
        for (const key in files) {
            const pluginModule = (await (_a = (0, path_1.join)(pluginPaths, files[key]), Promise.resolve().then(() => __importStar(require(_a)))))
                .default;
            const instance = this.createPluginInstance(pluginModule, this.application);
            const metadata = (0, controllers_1.getPluginMetadata)(instance);
            if (metadata.controllers) {
                this.application.server.registerControllers(metadata.controllers);
            }
            this.plugins.push({
                instance,
                metadata,
            });
        }
        // load plugins from node_modules
        const config = await (0, helpers_1.loadConfig)('plugins');
        for (const key in config.plugins) {
            const instance = this.createPluginInstance(config.plugins[key], this.application);
            const metadata = (0, controllers_1.getPluginMetadata)(instance);
            if (metadata.controllers) {
                this.application.server.registerControllers(metadata.controllers);
            }
            this.plugins.push({
                instance,
                metadata,
            });
        }
    }
    displayPlugins() {
        console.log(chalk_1.default.blue(chalk_1.default.bold('Plugins:')));
        const plugins = this.plugins;
        if (!plugins || !plugins.length) {
            console.log(chalk_1.default.white('no plugins installed'));
        }
        for (const plugin of plugins) {
            console.log(chalk_1.default.white(`- ${plugin.metadata.name}`));
        }
        console.log('');
    }
    createPluginInstance(target, app) {
        return new target(app);
    }
    async start() {
        await this.loadPlugins();
        for (const plugin of this.plugins) {
            await plugin.instance.initialize();
        }
        this.displayPlugins();
    }
}
exports.Plugins = Plugins;

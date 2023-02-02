"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const database_1 = require("./database");
const plugins_1 = require("./plugins");
const server_1 = require("./server");
const figlet_1 = __importDefault(require("figlet"));
class Application {
    constructor(options) {
        this.database = new database_1.Database();
        this.server = new server_1.Server(this, options);
        this.plugins = new plugins_1.Plugins(this);
    }
    start() {
        console.log(figlet_1.default.textSync('KULT'));
        this.plugins.startPlugins();
        this.server.listen();
    }
}
exports.Application = Application;

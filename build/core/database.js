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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const helpers_1 = require("../utils/helpers");
class Database {
    constructor() {
        this.datasource = null;
        this.entities = [];
        this.datasource = null;
        this.entities = [];
    }
    async getEntities() {
        const root = (0, helpers_1.getProjectRoot)();
        const entitiesPath = (0, path_1.join)(root, './app/models');
        const files = await (0, fs_1.readdirSync)(entitiesPath);
        return await Promise.all(files.map(async (file) => {
            var _a;
            return (await (_a = (0, path_1.join)(entitiesPath, file), Promise.resolve().then(() => __importStar(require(_a))))).default;
        }));
    }
    registerEntities(entities) {
        this.entities.push(...entities);
    }
    async start() {
        const config = await (0, helpers_1.loadConfig)('database');
        const entities = await this.getEntities();
        const modelEntities = (config.entities || []).map((schema) => new typeorm_1.EntitySchema(schema));
        this.registerEntities(entities);
        this.registerEntities(modelEntities);
        this.datasource = new typeorm_1.DataSource({
            ...config,
            type: config.type,
            synchronize: true,
            logging: false,
            entities: this.entities,
        });
        this.datasource.initialize();
    }
}
exports.Database = Database;

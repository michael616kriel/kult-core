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
exports.validRequestBody = exports.loadConfig = exports.getProjectRoot = void 0;
const path_1 = __importStar(require("path"));
const getProjectRoot = () => {
    var _a;
    return path_1.default.dirname(((_a = require === null || require === void 0 ? void 0 : require.main) === null || _a === void 0 ? void 0 : _a.filename) || '');
};
exports.getProjectRoot = getProjectRoot;
const loadConfig = async (type) => {
    var _a;
    const root = (0, exports.getProjectRoot)();
    const config = (await (_a = (0, path_1.join)(root, './config', type), Promise.resolve().then(() => __importStar(require(_a))))).default;
    if (typeof config === 'function') {
        return (await config());
    }
    return config;
};
exports.loadConfig = loadConfig;
const validRequestBody = (body, schema) => {
    var _a, _b, _c;
    for (const key in schema) {
        if (typeof schema[key] === 'object') {
            const valid = (0, exports.validRequestBody)(body[key], schema[key]);
            if (!valid) {
                return false;
            }
        }
        else if (typeof schema[key] === 'string') {
            const schemaRule = schema[key];
            const rules = schemaRule.split('|');
            if (!body) {
                return false;
            }
            if (!(key in body) && rules.includes('required')) {
                return false;
            }
            else {
                const type = (_a = rules.find((rule) => rule.includes('type'))) === null || _a === void 0 ? void 0 : _a.split(':')[1];
                const maxLength = (_b = rules
                    .find((rule) => rule.includes('max'))) === null || _b === void 0 ? void 0 : _b.split(':')[1];
                const minLength = (_c = rules
                    .find((rule) => rule.includes('min'))) === null || _c === void 0 ? void 0 : _c.split(':')[1];
                const propLength = body[key].toString().length;
                if (type && typeof body[key] !== type) {
                    return false;
                }
                if (maxLength && propLength > parseInt(maxLength)) {
                    return false;
                }
                if (minLength && propLength < parseInt(minLength)) {
                    return false;
                }
            }
        }
    }
    return true;
};
exports.validRequestBody = validRequestBody;

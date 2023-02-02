"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Drive = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const helpers_1 = require("../utils/helpers");
class Drive {
    static remove(path) {
        const root = (0, helpers_1.getProjectRoot)();
        const relativePath = (0, path_1.join)(root, path);
        if ((0, fs_1.existsSync)(relativePath)) {
            const stats = (0, fs_1.statSync)(relativePath);
            if (stats.isFile()) {
                (0, fs_1.rmSync)(relativePath);
            }
            if (stats.isDirectory()) {
                (0, fs_1.rmdirSync)(relativePath);
            }
        }
    }
    static read(path) {
        const root = (0, helpers_1.getProjectRoot)();
        const relativePath = (0, path_1.join)(root, path);
        return (0, fs_1.readFileSync)(relativePath);
    }
    static write(path, content) {
        const root = (0, helpers_1.getProjectRoot)();
        const relativePath = (0, path_1.join)(root, path);
        (0, fs_1.writeFileSync)(relativePath, content);
    }
}
exports.Drive = Drive;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
exports.Env = {
    get: (name, defaultValue) => {
        return process.env[name] || (defaultValue || '');
    },
};

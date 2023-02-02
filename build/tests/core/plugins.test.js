"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../../core/application");
require("../../core/database");
require("../../utils/helpers");
jest.mock('core/database');
jest.mock('utils/helpers', () => {
    return {
        getProjectRoot: () => '/src',
        loadConfig: () => ({ port: 3000 }),
    };
});
describe('Plugins', () => {
    const application = new application_1.Application();
    it('creates an instance of Plugins', async () => {
        expect(typeof application.plugins).toBe('object');
    });
    it('has all required methods', async () => {
        expect(typeof application.plugins.loadPlugins).toBe('function');
        expect(typeof application.plugins.startPlugins).toBe('function');
    });
    it('has all required properties', async () => {
        expect(typeof application.plugins.application).toBe('object');
    });
});

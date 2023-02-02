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
describe('Database', () => {
    const application = new application_1.Application();
    it('creates an instance of Database', async () => {
        expect(typeof application.database).toBe('object');
    });
    it('has all required methods', async () => {
        expect(typeof application.database.initialize).toBe('function');
    });
});

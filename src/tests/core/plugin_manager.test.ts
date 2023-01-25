import { Application } from 'core/application';
import 'core/database_manager';
import 'utils/helpers';

jest.mock('core/database_manager')
jest.mock('utils/helpers', () => {
  return {
    getProjectRoot: () => '/src',
    loadConfig: () => ({ port: 3000 }),
  };
});

describe('PluginManager', () => {
  const application = new Application();
  it('creates an instance of PluginManager', async () => {
    expect(typeof application.plugin_manager).toBe('object');
  });
  it('has all required methods', async () => {
    expect(typeof application.plugin_manager.loadPlugins).toBe('function');
    expect(typeof application.plugin_manager.startPlugins).toBe('function');
  });
  it('has all required properties', async () => {
    expect(typeof application.plugin_manager.application).toBe('object');
  });
});

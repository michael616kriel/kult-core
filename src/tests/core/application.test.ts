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

describe('Application', () => {
  const application = new Application();
  it('has all required methods', async () => {
    expect(typeof application.start).toBe('function');
  });
  it('creates an instance of ServerManager', async () => {
    expect(typeof application.server_manager).toBe('object');
  });
  it('creates an instance of PluginManager', async () => {
    expect(typeof application.plugin_manager).toBe('object');
  });
  it('creates an instance of DatabaseManager', async () => {
    expect(typeof application.database_manager).toBe('object');
  });
});

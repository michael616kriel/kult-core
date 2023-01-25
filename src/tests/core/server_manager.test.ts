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

describe('ServerManager', () => {
  const application = new Application();
  it('creates an instance of ServerManager', async () => {
    expect(typeof application.server_manager).toBe('object');
  });
  it('has all required methods', async () => {
    expect(typeof application.server_manager.initialize).toBe('function');
    expect(typeof application.server_manager.listen).toBe('function');
    expect(typeof application.server_manager.setupControllers).toBe('function');
  });
  it('has all required properties', async () => {
    expect(typeof application.server_manager.application).toBe('object');
  });
});

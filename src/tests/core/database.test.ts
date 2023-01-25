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

describe('Database', () => {
  const application = new Application();
  it('creates an instance of DatabaseManager', async () => {
    expect(typeof application.database_manager).toBe('object');
  });
  it('has all required methods', async () => {
    expect(typeof application.database_manager.initialize).toBe('function');
  });
});

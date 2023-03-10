import { Application } from 'core/application';
import 'core/database';
import 'utils/helpers';

jest.mock('core/database')
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
  it('creates an instance of Server', async () => {
    expect(typeof application.server).toBe('object');
  });
  it('creates an instance of Plugins', async () => {
    expect(typeof application.plugins).toBe('object');
  });
  it('creates an instance of Database', async () => {
    expect(typeof application.database).toBe('object');
  });
});

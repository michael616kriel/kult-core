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

describe('Plugins', () => {
  const application = new Application();
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

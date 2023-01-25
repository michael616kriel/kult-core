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

describe('Server', () => {
  const application = new Application();
  it('creates an instance of Server', async () => {
    expect(typeof application.server).toBe('object');
  });
  it('has all required methods', async () => {
    expect(typeof application.server.initialize).toBe('function');
    expect(typeof application.server.listen).toBe('function');
    expect(typeof application.server.setupControllers).toBe('function');
  });
  it('has all required properties', async () => {
    expect(typeof application.server.application).toBe('object');
  });
});

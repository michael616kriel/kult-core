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

describe('Database', () => {
  const application = new Application();
  it('creates an instance of Database', async () => {
    expect(typeof application.database).toBe('object');
  });
  it('has all required methods', async () => {
    expect(typeof application.database.initialize).toBe('function');
  });
});

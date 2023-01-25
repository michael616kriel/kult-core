import path, { join } from 'path';

export const getProjectRoot = () => {
  return path.dirname(require?.main?.filename || '');
};

export const loadConfig = async <T>(type: 'server' | 'plugins' | 'database') => {
  const root = getProjectRoot();
  return (await import(join(root, './config', type))).default as T;
};

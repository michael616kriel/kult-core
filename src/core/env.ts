export const Env = {
  get: (name: string, defaultValue?: string | number): string | number => {
    return process.env[name] || (defaultValue || '');
  },
};

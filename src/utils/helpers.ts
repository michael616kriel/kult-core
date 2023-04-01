import path, { join } from 'path';

export const getProjectRoot = () => {
  return path.dirname(require?.main?.filename || '');
};

export const loadConfig = async <T>(
  type: string
) => {
  const root = getProjectRoot();
  const config = (await import(join(root, './config', type))).default;
  if (typeof config === 'function') {
    return (await config()) as T;
  }
  return config as T;
};

type ValidationBodyStucture = {
  [key: string]: string | number | ValidationBodyStucture;
};
type ValidationSchemaStucture = {
  [key: string]: string | ValidationSchemaStucture;
};

export const validRequestBody = (
  body: ValidationBodyStucture,
  schema: ValidationSchemaStucture
): boolean => {
  for (const key in schema) {
    if (typeof schema[key] === 'object') {
      const valid = validRequestBody(
        body[key] as ValidationBodyStucture,
        schema[key] as ValidationSchemaStucture
      );
      if (!valid) {
        return false;
      }
    } else if (typeof schema[key] === 'string') {
      const schemaRule = schema[key] as string;
      const rules = schemaRule.split('|');
      if (!body) {
        return false;
      }
      if (!(key in body) && rules.includes('required')) {
        return false;
      } else {
        const type = rules.find((rule) => rule.includes('type'))?.split(':')[1];
        const maxLength = rules
          .find((rule) => rule.includes('max'))
          ?.split(':')[1];
        const minLength = rules
          .find((rule) => rule.includes('min'))
          ?.split(':')[1];
        const propLength = body[key].toString().length;
        if (type && typeof body[key] !== type) {
          return false;
        }
        if (maxLength && propLength > parseInt(maxLength)) {
          return false;
        }
        if (minLength && propLength < parseInt(minLength)) {
          return false;
        }
      }
    }
  }
  return true;
};

export declare const getProjectRoot: () => string;
export declare const loadConfig: <T>(type: string) => Promise<T>;
type ValidationBodyStucture = {
    [key: string]: string | number | ValidationBodyStucture;
};
type ValidationSchemaStucture = {
    [key: string]: string | ValidationSchemaStucture;
};
export declare const validRequestBody: (body: ValidationBodyStucture, schema: ValidationSchemaStucture) => boolean;
export {};

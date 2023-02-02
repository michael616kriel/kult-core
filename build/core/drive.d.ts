/// <reference types="node" />
/// <reference types="node" />
export declare class Drive {
    static remove(path: string): void;
    static read(path: string): Buffer;
    static write(path: string, content: string | NodeJS.ArrayBufferView): void;
}

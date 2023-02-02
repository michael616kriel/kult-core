import { DataSource } from 'typeorm';
export declare class Database {
    datasource: DataSource | null;
    constructor();
    initialize(): Promise<void>;
    getEntities(): Promise<any[]>;
}

import { DataSource, EntitySchema } from 'typeorm';
export declare class Database {
    datasource: DataSource | null;
    entities: EntitySchema[];
    constructor();
    getEntities(): Promise<any[]>;
    registerEntities(entities: EntitySchema[]): void;
    start(): Promise<void>;
}

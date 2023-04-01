import { readdirSync } from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm';
import { getProjectRoot, loadConfig } from '../utils/helpers';

export class Database {
  datasource: DataSource | null = null;
  entities: EntitySchema[] = [];

  constructor() {
    this.datasource = null;
    this.entities = [];
  }

  async getEntities() {
    const root = getProjectRoot();
    const entitiesPath = join(root, './app/models');
    const files = await readdirSync(entitiesPath);
    return await Promise.all(
      files.map(async (file) => {
        return (await import(join(entitiesPath, file))).default;
      })
    );
  }

  registerEntities(entities: EntitySchema[]) {
    this.entities.push(...entities);
  }

  async start() {
    const config = await loadConfig<DataSourceOptions>('database');
    const entities = await this.getEntities();
    const modelEntities: EntitySchema[] = (
      (config.entities as any[]) || []
    ).map((schema) => new EntitySchema(schema));

    this.registerEntities(entities);
    this.registerEntities(modelEntities);

    this.datasource = new DataSource({
      ...(config as DataSourceOptions),
      type: config.type as any,
      synchronize: true,
      logging: false,
      entities: this.entities,
    });
    this.datasource.initialize();
  }
}

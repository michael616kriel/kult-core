import { readdirSync } from 'fs';
import { join } from 'path';
import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm';
import { getProjectRoot, loadConfig } from '../utils/helpers';

export class Database {
  datasource: DataSource | null = null;
  constructor() {
    this.datasource = null;
    this.initialize();
  }

  async initialize() {
    const config = await loadConfig<DataSourceOptions>('database');
    const entities = await this.getEntities();
    const modelEntities: any[] = ((config.entities as any[]) || []).map(
      (schema) => new EntitySchema(schema)
    );
    modelEntities.push(...entities);

    this.datasource = new DataSource({
      ...(config as DataSourceOptions),
      type: config.type as any,
      synchronize: true,
      logging: false,
      entities: modelEntities,
    });
    this.datasource.initialize();
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
}

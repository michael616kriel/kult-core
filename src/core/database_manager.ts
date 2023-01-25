import { DataSource, DataSourceOptions } from 'typeorm';
import { loadConfig } from 'utils/helpers';

export class DatabaseManager {
  datasource: DataSource | null = null;
  constructor() {
    this.datasource = null;
    this.initialize();
  }

  async initialize() {
    const config = await loadConfig<DataSourceOptions>('database');
    this.datasource = new DataSource({
      ...(config as DataSourceOptions),
      type: config.type as any,
      synchronize: true,
      logging: true,
      entities: ['app/models/*.js'],
      subscribers: ['app/subscriber/*.js'],
      migrations: ['database/migration/*.js'],
    });
  }
}

import * as migration_20250612_192923_migration from './20250612_192923_migration';
import * as migration_20250612_202016_migration from './20250612_202016_migration';
import * as migration_20250612_202202_migration from './20250612_202202_migration';
import * as migration_20250612_202319_migration from './20250612_202319_migration';

export const migrations = [
  {
    up: migration_20250612_192923_migration.up,
    down: migration_20250612_192923_migration.down,
    name: '20250612_192923_migration',
  },
  {
    up: migration_20250612_202016_migration.up,
    down: migration_20250612_202016_migration.down,
    name: '20250612_202016_migration',
  },
  {
    up: migration_20250612_202202_migration.up,
    down: migration_20250612_202202_migration.down,
    name: '20250612_202202_migration',
  },
  {
    up: migration_20250612_202319_migration.up,
    down: migration_20250612_202319_migration.down,
    name: '20250612_202319_migration'
  },
];

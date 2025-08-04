import * as migration_20250630_234841_migration from './20250630_234841_migration';

export const migrations = [
  {
    up: migration_20250630_234841_migration.up,
    down: migration_20250630_234841_migration.down,
    name: '20250630_234841_migration'
  },
];

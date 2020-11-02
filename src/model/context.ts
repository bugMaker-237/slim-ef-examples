import { resolve } from 'path';
import { Connection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import {
  DbContext,
  DbSet,
  DbSetEntity,
  IDbSet,
  SQLQuerySpecificationEvaluator
} from 'slim-ef';
import {
  IDbContextOptionsBuilder,
  DbContextModelBuilder
} from 'slim-ef/lib/uow';
import { Agency } from './agency';
import { Person } from './person';
import { Trip } from './trip';

export class DeltaTravelDBContext extends DbContext {
  constructor() {
    /**
     * SQLite connection
     */
    super(
      new Connection({
        type: 'sqlite',
        database: resolve(__dirname, '../seeder', 'slim_ef_test.db'),
        entities: [Person, Agency, Trip],
        synchronize: false
      } as SqliteConnectionOptions),
      SQLQuerySpecificationEvaluator
    );
  }

  protected onModelCreation<BaseType extends object = any>(
    builder: DbContextModelBuilder<BaseType>
  ): void {
    builder.entity(Person).hasQueryFilter(q => q.where(e => e.IDNumber > 50));
  }

  protected onConfiguring(optionsBuilder: IDbContextOptionsBuilder): void {
    // optionsBuilder.useLoggerFactory({
    //   createLogger: (catName: string) => ({
    //     log: (level, state) => console.log({ catName, state, level }),
    //   }),
    // });
  }

  @DbSetEntity(Person)
  public readonly persons: IDbSet<Person>;

  @DbSetEntity(Agency)
  public readonly agencies: IDbSet<Agency>;

  @DbSetEntity(Trip)
  public readonly trips: IDbSet<Trip>;
}

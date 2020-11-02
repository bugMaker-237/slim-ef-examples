import { DeltaTravelDBContext } from '../model/context';
import { SlimExpression } from 'slim-exp';
import { Person } from '../model/person';

export async function orderByThenBy() {
  console.log(`Running ${orderByThenBy.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons
    .orderBy(p => p.firstname)
    .thenOrderBy(p => p.lastname)
    .toList();

  context.dispose();

  console.table(res, [
    SlimExpression.nameOf<Person>(p => p.firstname),
    SlimExpression.nameOf<Person>(p => p.lastname)
  ]);
}

orderByThenBy();

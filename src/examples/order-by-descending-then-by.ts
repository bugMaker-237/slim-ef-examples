import { DeltaTravelDBContext } from '../model/context';
import { SlimExpression } from 'slim-exp';
import { Person } from '../model/person';

export async function orderByDescendingThenBy() {
  console.log(`Running ${orderByDescendingThenBy.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons
    .orderByDescending(p => p.IDNumber)
    .thenOrderBy(p => p.firstname)
    .toList();

  context.dispose();

  console.table(res, [
    SlimExpression.nameOf<Person>(p => p.IDNumber),
    SlimExpression.nameOf<Person>(p => p.firstname),
    SlimExpression.nameOf<Person>(p => p.lastname)
  ]);
}

orderByDescendingThenBy();

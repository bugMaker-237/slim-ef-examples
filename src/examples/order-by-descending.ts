import { DeltaTravelDBContext } from '../model/context';
import { SlimExpression } from 'slim-exp';
import { Person } from '../model/person';

export async function orderByDescending() {
  console.log(`Running ${orderByDescending.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.orderByDescending(p => p.lastname).toList();

  context.dispose();

  console.table(res, [
    SlimExpression.nameOf<Person>(p => p.lastname),
    SlimExpression.nameOf<Person>(p => p.firstname)
  ]);
}

orderByDescending();

import { DeltaTravelDBContext } from '../model/context';
import { Person } from '../model/person';

export async function firstOrDefault() {
  console.log(`Running ${firstOrDefault.name}`);
  const context = new DeltaTravelDBContext();
  const pd = { name: 'somethingNotFound' }; // predicate data
  const query = (a: Person, $: typeof pd) => a.lastname.includes($.name);

  const res = await context.persons.firstOrDefault(query, pd);

  console.table({ somethingNotFound: res }); // <- undefined

  context.dispose();
}

firstOrDefault();

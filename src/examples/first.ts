import { DeltaTravelDBContext } from '../model/context';

export async function first() {
  console.log(`Running ${first.name}`);
  const context = new DeltaTravelDBContext();
  const pd = { name: 'somethingNotFound' }; // predicate data

  try {
    const res = await context.persons.first(
      (a, $) => a.lastname.includes($.name),
      pd
    ); // throws Exception

    console.table({ somethingNotFound: res });
  } catch (error) {
    console.error(error);
  } finally {
    context.dispose();
  }
}

first();

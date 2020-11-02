import { DeltaTravelDBContext } from '../model/context';

export async function count() {
  console.log(`Running ${count.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.count();

  console.table({ 'count of IDNumber': res });

  context.dispose();
}

count();

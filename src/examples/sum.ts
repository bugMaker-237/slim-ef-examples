import { DeltaTravelDBContext } from '../model/context';

export async function sum() {
  console.log(`Running ${sum.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.sum(p => p.IDNumber);

  console.table({ 'sum of IDNumber': res });

  context.dispose();
}

sum();

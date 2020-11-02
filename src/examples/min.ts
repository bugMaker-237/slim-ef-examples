import { DeltaTravelDBContext } from '../model/context';

export async function min() {
  console.log(`Running ${min.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.min(p => p.IDNumber);

  console.table({ 'min of IDNumber': res });

  context.dispose();
}

min();

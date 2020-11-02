import { DeltaTravelDBContext } from '../model/context';

export async function average() {
  console.log(`Running ${average.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.average(p => p.IDNumber);

  console.table({ 'avg of IDNumber': res });

  context.dispose();
}

average();

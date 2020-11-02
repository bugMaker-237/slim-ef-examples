import { DeltaTravelDBContext } from '../model/context';

export async function max() {
  console.log(`Running ${max.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.max(p => p.lastname);

  console.table({ 'max of lastname': res });

  context.dispose();
}

max();

import { DeltaTravelDBContext } from '../model/context';

export async function remove() {
  console.log(`Running ${remove.name}`);
  const context = new DeltaTravelDBContext();
  const agency = await context.agencies.find(2);
  await context.agencies.remove(agency);
  await context.saveChanges();

  const dbAgency = await context.agencies.find(2);

  context.dispose();

  console.table({ 'Removed agency this should be undefined': dbAgency });
}

remove();

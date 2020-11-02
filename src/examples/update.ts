import { DeltaTravelDBContext } from '../model/context';

export async function update() {
  console.log(`Running ${update.name}`);
  const context = new DeltaTravelDBContext();
  const agency = await context.agencies.find(5);
  agency.name = 'Not so Crazy agency';

  context.agencies.update(agency);
  await context.saveChanges();

  const dbAgency = await context.agencies.first((a, $) => a.id === $.id, {
    id: agency.id
  });

  context.dispose();
  console.log('Updated agency');
  console.table([dbAgency]);
}

update();

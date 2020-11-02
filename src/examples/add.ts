import { Agency } from '../model/agency';
import { DeltaTravelDBContext } from '../model/context';
import { Trip } from '../model/trip';

export async function add() {
  console.log(`Running ${add.name}`);
  const context = new DeltaTravelDBContext();
  const agency = new Agency();
  agency.name = 'Crazy agency';
  agency.email = 'crazy@agency.super';
  agency.phone = '+996985328';

  const t1 = new Trip();
  t1.departureDate = new Date();
  t1.estimatedArrivalDate = new Date('09/10/2030');
  t1.agency = agency;

  const t2 = new Trip();
  t2.departureDate = new Date();
  t2.estimatedArrivalDate = new Date('09/11/2030');
  t2.agency = agency;

  context.agencies.add(agency);
  await context.saveChanges();

  t1.agencyId = agency.id;
  t2.agencyId = agency.id;
  context.trips.add(t1, t2);
  await context.saveChanges();

  const dbAgency = await context.agencies.first((a, $) => a.id === $.id, {
    id: agency.id
  });
  const dbT1 = await context.trips.first((a, $) => a.id === $.id, {
    id: t1.id
  });
  const dbT2 = await context.trips.first((a, $) => a.id === $.id, {
    id: t2.id
  });

  context.dispose();

  console.log('Added agency');
  console.table([dbAgency]);
  console.log('Added trip 1');
  console.table([dbT1]);
  console.log('Added trip 2');
  console.table([dbT2]);
}

add();

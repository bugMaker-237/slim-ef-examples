import { DeltaTravelDBContext } from '../model/context';
import { Trip } from '../model/trip';
import { flatten } from './utils';

export async function whereSimple() {
  console.log(`Running ${whereSimple.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons
    .where(p => p.firstname.includes('bug'))
    .select(a => ({
      name: a.firstname,
      phone: a.phone,
      email: a.email
    }))
    .toList();

  context.dispose();

  console.table(res);
}

export async function whereLogicalExps() {
  console.log(`Running ${whereLogicalExps.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons
    .where(p => !p.willTravel && p.IDNumber > 500000)
    .select(p => ({
      name: p.firstname,
      isTravelling: p.willTravel,
      num: p.IDNumber
    }))
    .toList();

  context.dispose();

  console.table(res);
}

export async function whereComplex() {
  console.log(`Running ${whereComplex.name}`);
  const context = new DeltaTravelDBContext();
  const data = {
    departureDate: new Date(2000, 1, 1)
  };

  const query = (t: Trip, $: typeof data) =>
    t.departureDate > $.departureDate ||
    (t.passengers.some(p => p.willTravel === false) &&
      t.departureDate < $.departureDate) ||
    (t.passengers.some(p => p.willTravel === true) &&
      t.passengers.some(p => p.IDNumber > 500000));

  const selector = (t: Trip) => ({
    id: t.id,
    passengers: t.passengers.map(p => ({
      name: p.lastname,
      isTravelling: p.willTravel,
      num: p.IDNumber,
      tripId: p.tripId
    })),
    departure: t.departureDate,
    arrival: t.estimatedArrivalDate
  });

  const res = await context.trips
    .include(t => t.passengers)
    .where(query, data)
    .orderBy(t => t.id)
    .select(selector)
    .toList();

  console.table(res);

  context.dispose();

  const flattenedPassengers = flatten(res.map(r => r.passengers));
  console.log('passengers:');
  console.table(flattenedPassengers);
}

whereSimple();
whereLogicalExps();
whereComplex();

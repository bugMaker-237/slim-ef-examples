import { DeltaTravelDBContext } from '../model/context';
import { flatten } from './utils';

export async function includeThenIncludeArray() {
  console.log(`Running ${includeThenIncludeArray.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies
    .include(a => a.trips)
    .thenInclude(t => t.passengers)
    .toList();

  context.dispose();

  console.log('Has included all the passengers of the all trips');
  console.table(flatten(flatten(res.map(a => a.trips)).map(t => t.passengers)));
}

export async function includeThenInclude() {
  console.log(`Running ${includeThenInclude.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons
    .include(a => a.trip)
    .thenInclude(t => t.passengers)
    .toList();

  context.dispose();

  console.log('Has included all the passengers of the trip of a passengers');
  console.table(
    flatten(res.map(a => a.trip).map(t => (!t ? null : t.passengers)))
  );
}

includeThenInclude();

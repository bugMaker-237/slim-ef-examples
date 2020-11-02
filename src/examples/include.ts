import { DeltaTravelDBContext } from '../model/context';
import { flatten } from './utils';

export async function includeArray() {
  console.log(`Running ${includeArray.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies.include(a => a.trips).toList();

  context.dispose();

  console.log('Has included all the trips of the all agencies');
  console.table(flatten(res.map(a => a.trips)));
}

export async function include() {
  console.log(`Running ${include.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.persons.include(a => a.trip).toList();

  context.dispose();

  console.log(
    'Has included the trip of the all persons knowing that each person has one trip'
  );
  console.table(flatten(res.map(a => a.trip)));
}

include();

includeArray();

import { DeltaTravelDBContext } from '../model/context';

export async function find() {
  console.log(`Running ${find.name}`);
  const context = new DeltaTravelDBContext();
  const agency = await context.agencies.find(5);

  console.log('Found agency with id 5');
  console.table([agency]);
  context.dispose();
}

find();

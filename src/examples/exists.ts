import { DeltaTravelDBContext } from '../model/context';

export async function exists() {
  console.log(`Running ${exists.name}`);
  const context = new DeltaTravelDBContext();
  const doesExists = await context.agencies.exists(5);

  console.log({ 'Agency with id 5 exists ?': doesExists });
  context.dispose();
}

exists();

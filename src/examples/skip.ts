import { DeltaTravelDBContext } from '../model/context';

export async function skip() {
  console.log(`Running ${skip.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies.skip(3).toList();

  context.dispose();

  console.table(res);
}

skip();

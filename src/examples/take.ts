import { DeltaTravelDBContext } from '../model/context';

export async function take() {
  console.log(`Running ${take.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies.take(10).toList();

  console.table(res);

  context.dispose();
}

take();

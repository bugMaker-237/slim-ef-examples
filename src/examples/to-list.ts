import { DeltaTravelDBContext } from '../model/context';

export async function toList() {
  console.log(`Running ${toList.name}`);
  const context = new DeltaTravelDBContext();

  const res = await context.agencies.toList();

  console.table(res);

  context.dispose();
}

toList();

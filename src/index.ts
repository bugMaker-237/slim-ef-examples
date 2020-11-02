import { DeltaTravelDBContext } from './model/context';

export async function main() {
  const context = new DeltaTravelDBContext();
  const pd = { name: 'ol' }; // predicate data

  const res = await context.agencies
    .where((a, $) => a.name.includes($.name), pd)
    .toList();

  console.table(res);
}

main();

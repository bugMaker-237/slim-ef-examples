export const flatten = arr =>
  arr.reduce((p, c) => p.concat(Array.isArray(c) ? flatten(c) : c), []);

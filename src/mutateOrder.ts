export const mutateOrder = <T>(sequence: T[]): T[] => {
  let last = sequence.length;
  let pick: number;
  let temp: T;

  while (last) {
    pick = Math.floor(Math.random() * last--);

    temp = sequence[pick];
    sequence[pick] = sequence[last];
    sequence[last] = temp;
  }

  return sequence;
};

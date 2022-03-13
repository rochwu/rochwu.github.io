import {MutableRefObject, useRef} from 'react';

type Memory = {
  [id: string]: MutableRefObject<{}>;
};

const memory: Memory = {};

// Hacking references as identifiers
export const useMutex = <A, B>(id: string, a: A, b: B): A | B => {
  const unique = useRef({});

  if (!memory[id]) {
    memory[id] = unique;
  }

  return memory[id] === unique ? a : b;
};

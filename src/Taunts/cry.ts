import {randomIndex} from '../randomIndex';

const cries = [`oh no`, `why...`, `goodbye`, `fine`, `*sobs*`];

export const cry = () => {
  return cries[randomIndex(cries.length)];
};

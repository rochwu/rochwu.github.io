import {randomIndex} from '../randomIndex';

// TODO: Make it more whimsical, like fairies!
const cries = [`nooo`, `hmph`, `fine`, `owie`, `sigh`, `blech`, `oi`, 'ugh'];

export const cry = () => {
  return cries[randomIndex(cries.length)];
};

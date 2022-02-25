import {randomIndex} from '../randomIndex';

// TODO: Make it more whimsical, like fairies!
const cries = [`nou`, `hmph`, `fine`, `owie`, `sigh`, `blech`, `oi`];

export const cry = () => {
  return cries[randomIndex(cries.length)];
};

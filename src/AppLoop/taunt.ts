import {randomIndex} from '../randomIndex';

const taunts = [
  'lol!',
  'hahaha',
  'whoa, too close, way too close!',
  'nope nope nope',
  'not even close!',
  `ha! got nothin'`,
  'nice try',
  'eek!!!',
  'sooo slooow',
  'good attempt there, mate',
  'almost!',
  'are you even trying there?',
];

export const taunt = () => {
  const index = randomIndex(taunts.length);
  return taunts[index];
};

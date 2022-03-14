import {randomIndex} from '../randomIndex';

const insults = [
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

export const insult = () => {
  const index = randomIndex(insults.length);
  return insults[index];
};

import {useRecoilValue} from 'recoil';

import {attemptsState, starsFelledState} from '../state';
import {isTouchDevice} from '../isTouchDevice';
import {randomIndex} from '../randomIndex';
import {MILESTONES} from '../constants';
import {mutateOrder} from '../mutateOrder';

const WONDER_CASES = 5;

// TODO: This used to take var in its language, should I revisit?
// Keep language wholesome still though, wholesomeish
const readScript = (index: number | undefined) => {
  switch (index) {
    case 0:
      return `they say star are gases, I say words`;
    case 1:
      return `imagine rectangular stars, right above you, taunting you`;
    case 2:
      return `ever wonder what stars made of text would look like?`;
    case 3:
      return `have you touched stars? they tend to flee`;
    case 4:
      return 'do they vanish or are we moving further away';
    default:
      return `doesn't it look like a starry night`;
  }
};

const philosophize = (() => {
  let repeats = 0;

  let index = WONDER_CASES; // Out of bound causes undefined aka default
  const indices = Array.from(Array(WONDER_CASES).keys()); // 0 to WONDER_CASES
  mutateOrder(indices);

  return () => {
    if (repeats > 5) {
      repeats = 0;
      index += 1;

      if (index >= WONDER_CASES) {
        index = 0;
        mutateOrder(indices);
      }
    }

    repeats += 1;

    return readScript(indices[index]);
  };
})();

const praiseScore = (attempts: number) => {
  switch (randomIndex(5)) {
    case 0:
      return `${attempts}, not bad`;
    case 1:
      return `got ${attempts} now`;
    case 2:
      return `look, ${attempts}!`;
    case 3:
      return `grats! ${attempts}`;
    case 4:
    default:
      return `${attempts}!`;
  }
};

export const useComment = () => {
  const attempts = useRecoilValue(attemptsState);
  const haveFalledStars = useRecoilValue(starsFelledState) > 0;

  if (isTouchDevice()) {
    return `oops, won't work properly with touch, try a mouse!`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 7) {
    return philosophize();
  } else if (attempts > MILESTONES.MAX_TAUNT_AGE) {
    return `have you notice the fading?`;
  } else if (haveFalledStars) {
    return `oh no, you'll scare them away`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON + 3) {
    return praiseScore(attempts);
  } else if (attempts > MILESTONES.INCREMENTAL_ON) {
    return `is this an incremental?`;
  } else if (attempts === MILESTONES.INCREMENTAL_ON) {
    return 'hold on--';
  } else if (attempts > MILESTONES.BREAK + 1) {
    return `...how did it...`;
  } else if (attempts > MILESTONES.BREAK) {
    return '!? aiya...';
  } else if (attempts > 1) {
    return `oi where is it going!`;
  } else if (attempts >= 1) {
    return 'see the horrible stuff I built...?';
  }

  return 'come see the horrible stuff I built down below';
};

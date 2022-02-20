import {useRecoilValue} from 'recoil';

import {attemptsState, MILESTONES} from '../state';
import {isTouchDevice} from '../isTouchDevice';
import {useRef} from 'react';
import {randomIndex} from '../randomIndex';

const praiseScore = (attempts: number) => {
  switch (randomIndex(4)) {
    case 0:
      return `${attempts}, not bad`;
    case 1:
      return `${attempts} alright!`;
    case 2:
      return `just got ${attempts}!`;
    case 3:
    default:
      return `nice! ${attempts}`;
  }
};

export const useComment = () => {
  const attempts = useRecoilValue(attemptsState);
  const onBreak = useRef(0);

  if (isTouchDevice()) {
    return `oops, won't work properly on a touch device, try a mouse!`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 8) {
    return `remember you came here for a github link?`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 4) {
    return `TODO: better dialogue, take a writing class`;
  } else if (attempts > MILESTONES.INCREMENTAL_ON * 2) {
    return praiseScore(attempts);
  } else if (attempts > MILESTONES.INCREMENTAL_ON) {
    return `it's a game!`;
  } else if (attempts === MILESTONES.INCREMENTAL_ON) {
    return 'wait--';
  } else if (attempts > MILESTONES.BREAK) {
    onBreak.current += 1;
    if (onBreak.current === 1) {
      return 'hold on-- aiya...';
    } else {
      return `oh dear..${'.'.repeat(onBreak.current)}`;
    }
  } else if (attempts > 1) {
    return `and it's gone!`;
  } else if (attempts >= 1) {
    return 'oi where is it going?';
  }

  return 'sup check out the horrible stuff I built down below';
};

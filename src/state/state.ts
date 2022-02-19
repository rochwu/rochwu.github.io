import {CSSProperties} from 'react';
import {atom, selector} from 'recoil';

export const attemptsState = atom({
  key: 'attemptsState',
  default: 0,
});

export const MILESTONES = {
  BREAK: 2,
  INCREMENTAL_ON: 5,
};

export const isButtonBroken = selector({
  key: 'isButtonBroken', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const attempts = get(attemptsState);

    // TODO: There's a bug on intial positions where it may be null
    return attempts > MILESTONES.BREAK;
  },
});

export const isButtonBreaking = selector({
  key: 'isButtonBreaking', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const attempts = get(attemptsState);

    return attempts === MILESTONES.BREAK;
  },
});

export const breakPositionState = atom<CSSProperties | undefined>({
  key: 'breakPositionState',
  default: undefined,
});

export const isIncrementalGameState = selector({
  key: 'isIncrementalGameState',
  get({get}) {
    const attempts = get(attemptsState);

    return attempts >= MILESTONES.INCREMENTAL_ON;
  },
});

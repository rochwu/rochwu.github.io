import {CSSProperties} from 'react';
import {atom, selector} from 'recoil';

export const attemptsState = atom({
  key: 'attemptsState',
  default: 0,
});

const BREAK_POINT = 2;
const INCREMENTAL_ON = BREAK_POINT + 2;

export const isButtonBroken = selector({
  key: 'isButtonBroken', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const attempts = get(attemptsState);

    // TODO: There's a bug on intial positions where it may be null
    return attempts > BREAK_POINT;
  },
});

export const isButtonBreaking = selector({
  key: 'isButtonBreaking', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const attempts = get(attemptsState);

    return attempts === BREAK_POINT;
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

    return attempts >= INCREMENTAL_ON;
  },
});

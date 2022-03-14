import {CSSProperties} from 'react';
import {atom, selector} from 'recoil';

import {MILESTONES} from '../constants';
import {TauntState} from '../types';

export const attemptsState = atom({
  key: 'attemptsState',
  default: 0,
});

export const breakPositionState = atom<CSSProperties | undefined>({
  key: 'breakPositionState',
  default: undefined,
});

export const starsFelledState = atom({
  key: 'starsFelledState',
  default: 0,
});

export const tauntsState = atom<TauntState[]>({
  key: 'tauntsState',
  default: [],
});

export const commentaryState = atom<string>({
  key: 'commentaryState',
  default: '',
});

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

export const isIncrementalGameState = selector({
  key: 'isIncrementalGameState',
  get({get}) {
    const attempts = get(attemptsState);

    return attempts >= MILESTONES.INCREMENTAL_ON;
  },
});

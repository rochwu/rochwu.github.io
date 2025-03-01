import {useCallback} from 'react';
import {atom, DefaultValue, selector, useSetRecoilState} from 'recoil';

const KEY = 'rochwu-unlocks' as const;

type Unlocks = {
  keyboardFocus: boolean;
  mouseOver: boolean;
  incremental: boolean;
  starFall: boolean;
  buttonBreak: boolean;
  dayMode: boolean;
};

const defaultValue: Unlocks = {
  keyboardFocus: false,
  mouseOver: false,
  incremental: false,
  starFall: false,
  buttonBreak: false,
  dayMode: false,
};

export const UNLOCKS_MAX = Object.keys(defaultValue).length;

const storage = {
  get: (): Unlocks => {
    const item = window.localStorage.getItem(KEY);

    let unlocks = defaultValue;
    if (item) {
      try {
        unlocks = JSON.parse(item);
      } catch {}
    }

    return unlocks;
  },
  set: (unlocks: Unlocks) => {
    const serialized = JSON.stringify(unlocks);

    window.localStorage.setItem(KEY, serialized);
  },
  clear: () => {
    window.localStorage.removeItem(KEY);
  },
};

export const unlocksState = atom({
  key: 'unlocksState',
  default: storage.get(),
});

export const getUnlocksState = selector<number>({
  key: 'getUnlocksState',
  get: ({get}) => {
    const unlocks = get(unlocksState);

    return Object.values(unlocks).reduce((count, isTrue) => {
      if (isTrue) {
        count += 1;
      }

      return count;
    }, 0);
  },
});

export const setUnlockState = selector<keyof Unlocks>({
  key: 'setUnlockState',
  get: () => undefined as never,
  set: ({set, get}, value) => {
    const state: Unlocks = get(unlocksState);

    if (!(value instanceof DefaultValue) && !state[value]) {
      const nextState = {...state, [value]: true};

      set(unlocksState, nextState);
      storage.set(nextState);
    }
  },
});

export const useClearUnlocks = () => {
  const set = useSetRecoilState(unlocksState);

  return useCallback(() => {
    set(defaultValue);
    storage.clear();
  }, [set]);
};
